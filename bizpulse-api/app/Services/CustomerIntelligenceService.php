<?php

namespace App\Services;

use App\Models\Tenant;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Support\Facades\Cache;

class CustomerIntelligenceService
{
    public function overview(Tenant $tenant): array
    {
        return Cache::remember("bp:{$tenant->id}:customer:overview", 600, function () use ($tenant) {
            $total = Customer::where('tenant_id', $tenant->id)->count();
            $revenue = Customer::where('tenant_id', $tenant->id)->sum('total_revenue');
            $orders = Order::where('tenant_id', $tenant->id)->count();

            $segments = Customer::where('tenant_id', $tenant->id)
                ->selectRaw("COALESCE(segment, 'unassigned') as segment, COUNT(*) as count, SUM(total_revenue) as revenue")
                ->groupBy('segment')
                ->get()
                ->mapWithKeys(fn ($r) => [
                    $r->segment => ['count' => (int) $r->count, 'revenue' => (float) ($r->revenue ?? 0)],
                ])
                ->toArray();

            $avgChurn = Customer::where('tenant_id', $tenant->id)
                ->whereNotNull('churn_score')
                ->avg('churn_score');

            return [
                'total_customers' => $total,
                'total_revenue' => round($revenue, 2),
                'total_orders' => $orders,
                'revenue_per_customer' => $total > 0 ? round($revenue / $total, 2) : 0,
                'orders_per_customer' => $total > 0 ? round($orders / $total, 1) : 0,
                'segments' => $segments,
                'avg_churn_score' => round((float) ($avgChurn ?? 0), 2),
            ];
        });
    }

    public function rfmSegmentation(Tenant $tenant): array
    {
        return Cache::remember("bp:{$tenant->id}:customer:rfm", 1200, function () use ($tenant) {
            $customers = Customer::where('tenant_id', $tenant->id)
                ->whereNotNull('last_order_at')
                ->whereNotNull('total_orders')
                ->get(['id', 'client_id', 'name', 'email', 'total_revenue', 'total_orders', 'last_order_at', 'segment', 'churn_score']);

            if ($customers->isEmpty()) {
                return ['segments' => [], 'distribution' => []];
            }

            $maxFreq = $customers->max('total_orders') ?: 1;
            $maxMon = $customers->max('total_revenue') ?: 1;
            $now = now();

            $scored = $customers->map(function ($c) use ($now, $maxFreq, $maxMon) {
                $daysSince = $c->last_order_at->diffInDays($now);

                $rScore = match (true) {
                    $daysSince <= 7 => 5,
                    $daysSince <= 30 => 4,
                    $daysSince <= 60 => 3,
                    $daysSince <= 90 => 2,
                    default => 1,
                };

                $fScore = $maxFreq > 0
                    ? max(1, min(5, (int) round(($c->total_orders / $maxFreq) * 5)))
                    : 1;

                $mScore = $maxMon > 0
                    ? max(1, min(5, (int) round(($c->total_revenue / $maxMon) * 5)))
                    : 1;

                return [
                    'id' => $c->id,
                    'client_id' => $c->client_id,
                    'name' => $c->name,
                    'email' => $c->email,
                    'total_revenue' => (float) $c->total_revenue,
                    'total_orders' => (int) $c->total_orders,
                    'last_order_at' => $c->last_order_at->toISOString(),
                    'days_since_last_order' => $daysSince,
                    'recency_score' => $rScore,
                    'frequency_score' => $fScore,
                    'monetary_score' => $mScore,
                    'rfm_total' => $rScore + $fScore + $mScore,
                ];
            });

            $segments = $scored->groupBy(fn ($s) => $this->assignSegment($s))->map(function ($group, $name) {
                return [
                    'name' => $name,
                    'count' => $group->count(),
                    'revenue' => round($group->sum('total_revenue'), 2),
                    'avg_rfm' => round($group->avg('rfm_total'), 1),
                    'customers' => $group->sortByDesc('rfm_total')->values()->take(10)->toArray(),
                ];
            })->sortByDesc('count')->values()->toArray();

            $distribution = [
                'avg_recency' => round($scored->avg('recency_score'), 1),
                'avg_frequency' => round($scored->avg('frequency_score'), 1),
                'avg_monetary' => round($scored->avg('monetary_score'), 1),
                'avg_rfm' => round($scored->avg('rfm_total'), 1),
                'high_value_pct' => $scored->count() > 0
                    ? round($scored->filter(fn ($s) => $s['rfm_total'] >= 12)->count() / $scored->count() * 100, 1)
                    : 0,
            ];

            return ['segments' => $segments, 'distribution' => $distribution];
        });
    }

    public function churnAnalysis(Tenant $tenant): array
    {
        return Cache::remember("bp:{$tenant->id}:customer:churn", 1800, function () use ($tenant) {
            $total = Customer::where('tenant_id', $tenant->id)->count();

            $byRisk = Customer::where('tenant_id', $tenant->id)
                ->selectRaw("
                    CASE
                        WHEN churn_score >= 0.7 THEN 'high'
                        WHEN churn_score >= 0.4 THEN 'medium'
                        WHEN churn_score >= 0.1 THEN 'low'
                        ELSE 'minimal'
                    END as risk_level,
                    COUNT(*) as count,
                    SUM(total_revenue) as revenue
                ")
                ->groupBy('risk_level')
                ->get()
                ->mapWithKeys(fn ($r) => [
                    $r->risk_level => ['count' => (int) $r->count, 'revenue' => (float) ($r->revenue ?? 0)],
                ])
                ->toArray();

            $recentLost = Customer::where('tenant_id', $tenant->id)
                ->where('segment', 'lost')
                ->where('last_order_at', '<=', now()->subDays(90))
                ->count();

            $atRiskRevenue = Customer::where('tenant_id', $tenant->id)
                ->where(function ($q) {
                    $q->where('churn_score', '>=', 0.4)
                      ->orWhere('segment', 'at_risk')
                      ->orWhere('segment', 'lost');
                })
                ->sum('total_revenue');

            return [
                'total_customers' => $total,
                'by_risk_level' => $byRisk,
                'recently_lost' => $recentLost,
                'at_risk_revenue' => round($atRiskRevenue, 2),
                'retention_rate' => $total > 0
                    ? round(($total - $recentLost) / $total * 100, 1)
                    : 100,
            ];
        });
    }

    public function clvAnalysis(Tenant $tenant): array
    {
        return Cache::remember("bp:{$tenant->id}:customer:clv", 3600, function () use ($tenant) {
            $customers = Customer::where('tenant_id', $tenant->id)
                ->where('total_orders', '>', 0)
                ->get(['id', 'name', 'client_id', 'total_revenue', 'total_orders', 'last_order_at', 'segment']);

            if ($customers->isEmpty()) {
                return ['overall' => [], 'by_segment' => []];
            }

            $avgOrderValue = $customers->sum('total_revenue') / $customers->sum('total_orders');

            $withClv = $customers->map(function ($c) use ($avgOrderValue) {
                $aov = $c->total_orders > 0 ? $c->total_revenue / $c->total_orders : 0;
                $lifespanMonths = $c->last_order_at
                    ? max(1, $c->last_order_at->diffInMonths(now()->subYear())) + 1
                    : 1;
                $monthlyFreq = $lifespanMonths > 0 ? $c->total_orders / $lifespanMonths : 0;
                $predictedClv = $aov * $monthlyFreq * 12;

                return [
                    'id' => $c->id,
                    'name' => $c->name,
                    'client_id' => $c->client_id,
                    'segment' => $c->segment,
                    'historical_clv' => (float) $c->total_revenue,
                    'predicted_clv' => round($predictedClv, 2),
                    'avg_order_value' => round($aov, 2),
                    'total_orders' => (int) $c->total_orders,
                ];
            });

            $overall = [
                'avg_order_value' => round($avgOrderValue, 2),
                'avg_clv_historical' => round($withClv->avg('historical_clv'), 2),
                'avg_clv_predicted' => round($withClv->avg('predicted_clv'), 2),
                'median_clv' => round($withClv->sortBy('historical_clv')->pluck('historical_clv')->median() ?? 0, 2),
                'top_clv' => round($withClv->max('historical_clv'), 2),
            ];

            $bySegment = $withClv->groupBy(fn ($c) => $c['segment'] ?? 'unassigned')
                ->map(fn ($group) => [
                    'count' => $group->count(),
                    'avg_clv' => round($group->avg('historical_clv'), 2),
                    'avg_predicted_clv' => round($group->avg('predicted_clv'), 2),
                    'total_revenue' => round($group->sum('historical_clv'), 2),
                ])
                ->sortByDesc('avg_clv')
                ->toArray();

            return [
                'overall' => $overall,
                'by_segment' => $bySegment,
                'top_customers' => $withClv->sortByDesc('historical_clv')->take(10)->values()->toArray(),
            ];
        });
    }

    private function assignSegment(array $s): string
    {
        $r = $s['recency_score'];
        $f = $s['frequency_score'];
        $m = $s['monetary_score'];

        if ($r >= 4 && $f >= 4 && $m >= 4) return 'champion';
        if ($r >= 3 && $f >= 3 && $m >= 3) return 'loyal';
        if ($f <= 1 && $r >= 4) return 'new';
        if ($r <= 2 && $f >= 3) return 'at_risk';
        if ($r <= 2) return 'lost';
        if ($f <= 2 && $m <= 2) return 'potential';
        return 'loyal';
    }
}
