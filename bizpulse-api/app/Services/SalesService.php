<?php

namespace App\Services;

use App\Models\Tenant;
use App\Models\DailySale;
use App\Models\HourlySale;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Cache;

class SalesService
{
    public function ticker(Tenant $tenant): array
    {
        $cacheKey = "bp:{$tenant->id}:sales:ticker";

        return Cache::remember($cacheKey, 60, function () use ($tenant) {
            $today = now()->startOfDay();
            $yesterday = now()->subDay()->startOfDay();

            $todaySales = HourlySale::where('tenant_id', $tenant->id)
                ->where('date', $today->toDateString())
                ->sum('revenue');

            $yesterdaySales = DailySale::where('tenant_id', $tenant->id)
                ->where('date', $yesterday->toDateString())
                ->value('revenue') ?? 0;

            $todayOrders = HourlySale::where('tenant_id', $tenant->id)
                ->where('date', $today->toDateString())
                ->sum('orders_count');

            $delta = $yesterdaySales > 0
                ? round((($todaySales - $yesterdaySales) / $yesterdaySales) * 100, 1)
                : 0;

            return [
                'revenue' => (float)$todaySales,
                'orders_count' => (int)$todayOrders,
                'vs_yesterday' => $delta,
                'vs_yesterday_label' => $delta >= 0 ? "+{$delta}%" : "{$delta}%",
                'currency' => 'BDT',
            ];
        });
    }

    public function comparisons(Tenant $tenant, string $period = '7d'): array
    {
        $cacheKey = "bp:{$tenant->id}:sales:comparisons:{$period}";
        $days = match ($period) {
            '30d' => 30,
            '90d' => 90,
            default => 7,
        };

        return Cache::remember($cacheKey, 120, function () use ($tenant, $days) {
            $current = DailySale::where('tenant_id', $tenant->id)
                ->where('date', '>=', now()->subDays($days)->startOfDay())
                ->sum('revenue');

            $previous = DailySale::where('tenant_id', $tenant->id)
                ->where('date', '>=', now()->subDays($days * 2)->startOfDay())
                ->where('date', '<', now()->subDays($days)->startOfDay())
                ->sum('revenue');

            return [
                'current' => (float)$current,
                'previous' => (float)$previous,
                'delta_pct' => $previous > 0
                    ? round((($current - $previous) / $previous) * 100, 1)
                    : 0,
                'period' => "last_{$days}_days",
            ];
        });
    }

    public function heatmap(Tenant $tenant, int $days = 30): array
    {
        $cacheKey = "bp:{$tenant->id}:sales:heatmap:{$days}";

        return Cache::remember($cacheKey, 300, function () use ($tenant, $days) {
            $rows = HourlySale::selectRaw('date, hour, SUM(revenue) as revenue, SUM(orders_count) as orders')
                ->where('tenant_id', $tenant->id)
                ->where('date', '>=', now()->subDays($days)->startOfDay())
                ->groupBy('date', 'hour')
                ->get();

            $grid = [];
            foreach ($rows as $row) {
                $dayOfWeek = strtolower($row->date->format('l'));
                if (!isset($grid[$dayOfWeek])) {
                    $grid[$dayOfWeek] = [];
                }
                $grid[$dayOfWeek][(int)$row->hour] = [
                    'revenue' => (float)$row->revenue,
                    'orders' => (int)$row->orders,
                ];
            }

            return $grid;
        });
    }

    public function forecast(Tenant $tenant): array
    {
        $cacheKey = "bp:{$tenant->id}:sales:forecast";

        return Cache::remember($cacheKey, 3600, function () use ($tenant) {
            $daily = DailySale::where('tenant_id', $tenant->id)
                ->where('date', '>=', now()->subDays(14)->startOfDay())
                ->orderBy('date')
                ->get(['date', 'revenue']);

            if ($daily->count() < 3) {
                return ['forecast' => null, 'message' => 'Insufficient data for forecast'];
            }

            $dates = $daily->pluck('date')->map(fn($d) => $d->timestamp)->toArray();
            $values = $daily->pluck('revenue')->toArray();
            $n = count($dates);

            $meanX = array_sum($dates) / $n;
            $meanY = array_sum($values) / $n;
            $num = 0;
            $den = 0;
            foreach ($dates as $i => $x) {
                $num += ($x - $meanX) * ($values[$i] - $meanY);
                $den += ($x - $meanX) ** 2;
            }
            $slope = $den > 0 ? $num / $den : 0;
            $intercept = $meanY - $slope * $meanX;

            $daysLeft = now()->diffInDays(now()->copy()->endOfMonth()) + 1;
            $projectedDaily = $slope * now()->timestamp + $intercept;
            $projectedEom = $projectedDaily * $daysLeft;

            $dailyAvg = array_sum($values) / $n;
            $confidence = min(95, max(50, 100 - ($dailyAvg > 0 ? (abs($slope) / $dailyAvg) * 100 : 0)));

            return [
                'projected_eom' => round($projectedEom, 2),
                'daily_average' => round($projectedDaily, 2),
                'confidence' => round($confidence, 1),
                'days_remaining' => $daysLeft,
                'trend' => $slope >= 0 ? 'up' : 'down',
            ];
        });
    }

    public function topProducts(Tenant $tenant, int $limit = 10): array
    {
        return Product::where('tenant_id', $tenant->id)
            ->orderByDesc('stock_quantity')
            ->limit($limit)
            ->get(['id', 'name', 'sku', 'price', 'cost_price', 'stock_quantity', 'category'])
            ->toArray();
    }

    public function promoRoi(Tenant $tenant, string $from, string $to): array
    {
        $cacheKey = "bp:{$tenant->id}:sales:promo:{$from}:{$to}";

        return Cache::remember($cacheKey, 300, function () use ($tenant, $from, $to) {
            $promoOrders = Order::where('tenant_id', $tenant->id)
                ->whereBetween('ordered_at', [$from, $to])
                ->whereNotNull('coupon_code')
                ->selectRaw('
                    coupon_code,
                    COUNT(*) as order_count,
                    SUM(total) as revenue,
                    SUM(discount_amount) as total_discount
                ')
                ->groupBy('coupon_code')
                ->get();

            $totalRevenue = Order::where('tenant_id', $tenant->id)
                ->whereBetween('ordered_at', [$from, $to])
                ->sum('total');

            return [
                'promotions' => $promoOrders,
                'total_revenue' => (float)$totalRevenue,
                'promo_revenue' => (float)$promoOrders->sum('revenue'),
                'total_discount_given' => (float)$promoOrders->sum('total_discount'),
                'promo_share_pct' => $totalRevenue > 0
                    ? round(($promoOrders->sum('revenue') / $totalRevenue) * 100, 1)
                    : 0,
            ];
        });
    }

    public function channels(Tenant $tenant, string $from, string $to): array
    {
        $cacheKey = "bp:{$tenant->id}:sales:channels:{$from}:{$to}";

        return Cache::remember($cacheKey, 300, function () use ($tenant, $from, $to) {
            return Order::where('tenant_id', $tenant->id)
                ->whereBetween('ordered_at', [$from, $to])
                ->whereNotNull('channel')
                ->selectRaw('
                    channel,
                    COUNT(*) as order_count,
                    SUM(total) as revenue,
                    AVG(total) as avg_order_value
                ')
                ->groupBy('channel')
                ->orderByDesc('revenue')
                ->get()
                ->toArray();
        });
    }

    public function refunds(Tenant $tenant, string $from, string $to): array
    {
        $cacheKey = "bp:{$tenant->id}:sales:refunds:{$from}:{$to}";

        return Cache::remember($cacheKey, 300, function () use ($tenant, $from, $to) {
            $total = Order::where('tenant_id', $tenant->id)
                ->whereBetween('ordered_at', [$from, $to])
                ->count();

            $refunded = Order::where('tenant_id', $tenant->id)
                ->whereBetween('ordered_at', [$from, $to])
                ->where('status', 'refunded')
                ->count();

            $refundAmount = Order::where('tenant_id', $tenant->id)
                ->whereBetween('ordered_at', [$from, $to])
                ->where('status', 'refunded')
                ->sum('total');

            return [
                'total_orders' => $total,
                'refunded_orders' => $refunded,
                'refund_rate_pct' => $total > 0 ? round(($refunded / $total) * 100, 2) : 0,
                'total_refund_amount' => (float)$refundAmount,
            ];
        });
    }
}
