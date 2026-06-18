<?php

namespace App\Services;

use App\Models\Tenant;
use App\Models\Product;
use App\Models\OrderItem;
use App\Models\HourlySale;
use App\Models\AnomalyAlert;
use Illuminate\Support\Facades\Cache;

class InventoryService
{
    public function deadStock(Tenant $tenant, int $daysInactive = 30): array
    {
        $cacheKey = "bp:{$tenant->id}:inventory:dead-stock:{$daysInactive}";

        return Cache::remember($cacheKey, 300, function () use ($tenant, $daysInactive) {
            $cutoff = now()->subDays($daysInactive);

            $orderedProductIds = OrderItem::where('tenant_id', $tenant->id)
                ->whereHas('order', fn ($q) => $q->where('ordered_at', '>=', $cutoff))
                ->pluck('product_client_id')
                ->unique();

            $products = Product::where('tenant_id', $tenant->id)
                ->where('stock_quantity', '>', 0)
                ->whereNotIn('client_id', $orderedProductIds)
                ->orderByDesc('stock_quantity')
                ->limit(50)
                ->get(['id', 'name', 'sku', 'stock_quantity', 'price', 'cost_price', 'category']);

            return $products->map(fn ($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'sku' => $p->sku,
                'stock_quantity' => $p->stock_quantity,
                'price' => (float) $p->price,
                'cost_price' => (float) ($p->cost_price ?? 0),
                'capital_at_risk' => round(($p->cost_price ?? $p->price) * $p->stock_quantity, 2),
                'category' => $p->category,
                'days_inactive' => $daysInactive,
            ])->toArray();
        });
    }

    public function reorderSuggestions(Tenant $tenant): array
    {
        $cacheKey = "bp:{$tenant->id}:inventory:reorder";

        return Cache::remember($cacheKey, 300, function () use ($tenant) {
            $totalItemsSold30d = (int) HourlySale::where('tenant_id', $tenant->id)
                ->where('date', '>=', now()->subDays(30)->toDateString())
                ->sum('items_count');

            $productCount = Product::where('tenant_id', $tenant->id)
                ->where('stock_quantity', '>', 0)
                ->count();

            $avgVelocity = $productCount > 0 ? $totalItemsSold30d / 30 / $productCount : 0;

            if ($avgVelocity <= 0) {
                return [];
            }

            return Product::where('tenant_id', $tenant->id)
                ->where('stock_quantity', '>', 0)
                ->where('stock_quantity', '<', $avgVelocity * 14)
                ->orderBy('stock_quantity')
                ->limit(20)
                ->get()
                ->map(fn ($p) => [
                    'id' => $p->id,
                    'name' => $p->name,
                    'sku' => $p->sku,
                    'stock_quantity' => $p->stock_quantity,
                    'sell_velocity' => round($avgVelocity, 2),
                    'days_until_stockout' => $avgVelocity > 0
                        ? round($p->stock_quantity / $avgVelocity, 1)
                        : 999,
                    'suggested_reorder' => (int) ceil($avgVelocity * 30),
                    'price' => (float) $p->price,
                ])
                ->values()
                ->toArray();
        });
    }

    public function marginAnalysis(Tenant $tenant): array
    {
        $cacheKey = "bp:{$tenant->id}:inventory:margins";

        return Cache::remember($cacheKey, 600, function () use ($tenant) {
            $products = Product::where('tenant_id', $tenant->id)
                ->whereNotNull('cost_price')
                ->where('cost_price', '>', 0)
                ->where('price', '>', 0)
                ->get(['id', 'name', 'sku', 'price', 'cost_price', 'stock_quantity', 'category']);

            $totalCapital = 0;
            $totalValue = 0;

            $items = $products->map(function ($p) use (&$totalCapital, &$totalValue) {
                $margin = (float) $p->price - (float) $p->cost_price;
                $marginPct = $p->price > 0 ? round(($margin / $p->price) * 100, 1) : 0;
                $capital = (float) $p->cost_price * $p->stock_quantity;
                $value = (float) $p->price * $p->stock_quantity;

                $totalCapital += $capital;
                $totalValue += $value;

                return [
                    'id' => $p->id,
                    'name' => $p->name,
                    'sku' => $p->sku,
                    'price' => (float) $p->price,
                    'cost_price' => (float) $p->cost_price,
                    'margin' => round($margin, 2),
                    'margin_pct' => $marginPct,
                    'stock_quantity' => $p->stock_quantity,
                    'category' => $p->category,
                ];
            });

            $avgMarginPct = $totalValue > 0 ? round(($totalValue - $totalCapital) / $totalValue * 100, 1) : 0;

            return [
                'products' => $items->sortByDesc('margin_pct')->values()->toArray(),
                'summary' => [
                    'total_products' => $items->count(),
                    'total_capital' => round($totalCapital, 2),
                    'total_value' => round($totalValue, 2),
                    'total_potential_profit' => round($totalValue - $totalCapital, 2),
                    'avg_margin_pct' => $avgMarginPct,
                    'high_margin_count' => $items->filter(fn ($i) => $i['margin_pct'] > 40)->count(),
                    'low_margin_count' => $items->filter(fn ($i) => $i['margin_pct'] < 10)->count(),
                ],
            ];
        });
    }

    public function seasonalDemand(Tenant $tenant): array
    {
        $thisMonth = now()->month;

        $thisMonthSales = HourlySale::where('tenant_id', $tenant->id)
            ->whereMonth('date', $thisMonth)
            ->sum('items_count');

        $allMonthly = HourlySale::where('tenant_id', $tenant->id)
            ->get()
            ->groupBy(fn ($s) => $s->date->month)
            ->map(fn ($rows) => $rows->sum('items_count'));

        $avgPerMonth = $allMonthly->count() > 0
            ? $allMonthly->sum() / $allMonthly->count()
            : 1;

        $lift = $avgPerMonth > 0 ? round(($thisMonthSales / $avgPerMonth) * 100, 0) : 0;

        return [
            'current_month_sales' => $thisMonthSales,
            'avg_monthly_sales' => round($avgPerMonth),
            'seasonal_lift_pct' => $lift,
            'is_seasonal_peak' => $lift > 120,
            'month_name' => now()->format('F'),
        ];
    }

    public function detectDeadStockAlerts(Tenant $tenant): void
    {
        $deadStock = $this->deadStock($tenant, 30);

        foreach ($deadStock as $item) {
            if ($item['capital_at_risk'] > 50000) {
                AnomalyAlert::updateOrCreate(
                    [
                        'tenant_id' => $tenant->id,
                        'type' => 'dead_stock',
                        'message' => "Dead stock: {$item['name']} — {$item['stock_quantity']} units, ৳{$item['capital_at_risk']} at risk",
                    ],
                    [
                        'severity' => $item['capital_at_risk'] > 200000 ? 'critical' : 'warning',
                        'dismissed_at' => null,
                        'meta' => ['product_id' => $item['id'], 'capital_at_risk' => $item['capital_at_risk']],
                    ]
                );
            }
        }
    }

    public function detectReorderAlerts(Tenant $tenant): void
    {
        $suggestions = $this->reorderSuggestions($tenant);

        foreach ($suggestions as $item) {
            if ($item['days_until_stockout'] <= 3) {
                AnomalyAlert::updateOrCreate(
                    [
                        'tenant_id' => $tenant->id,
                        'type' => 'stockout_warning',
                        'message' => "Stockout soon: {$item['name']} — {$item['stock_quantity']} left",
                    ],
                    [
                        'severity' => $item['days_until_stockout'] <= 1 ? 'critical' : 'warning',
                        'dismissed_at' => null,
                        'meta' => ['product_id' => $item['id'], 'days_until_stockout' => $item['days_until_stockout']],
                    ]
                );
            }
        }
    }
}
