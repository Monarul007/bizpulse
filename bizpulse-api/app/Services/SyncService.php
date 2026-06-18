<?php

namespace App\Services;

use App\Models\Tenant;
use App\Sync\SyncConfig;
use Illuminate\Support\Facades\DB;

class SyncService
{
    public function syncHourlySales(Tenant $tenant): int
    {
        $config = SyncConfig::for($tenant);
        $tenant->configureSecondaryConnection();

        $clientTable = $config->table('orders');
        $createdAtCol = $config->column('orders', 'created_at');
        $totalCol = $config->column('orders', 'total');

        $hourStart = now()->subHour()->startOfHour();
        $hourEnd = $hourStart->copy()->endOfHour();

        $orders = DB::connection('mysql_secondary')
            ->table($clientTable)
            ->selectRaw("COUNT(*) as orders_count, COALESCE(SUM($totalCol), 0) as revenue")
            ->whereBetween($createdAtCol, [$hourStart, $hourEnd])
            ->first();

        $existing = \App\Models\HourlySale::where('tenant_id', $tenant->id)
            ->where('date', $hourStart->toDateString())
            ->where('hour', $hourStart->hour)
            ->first();

        if ($existing) {
            $existing->update([
                'revenue' => $orders->revenue,
                'orders_count' => $orders->orders_count,
            ]);
        } else {
            \App\Models\HourlySale::create([
                'tenant_id' => $tenant->id,
                'date' => $hourStart->toDateString(),
                'hour' => $hourStart->hour,
                'revenue' => $orders->revenue,
                'orders_count' => $orders->orders_count,
            ]);
        }

        return $orders->orders_count;
    }

    public function syncDailySales(Tenant $tenant): void
    {
        $today = now()->startOfDay();

        $aggregate = \App\Models\HourlySale::where('tenant_id', $tenant->id)
            ->where('date', $today->toDateString())
            ->selectRaw('
                SUM(revenue) as revenue,
                SUM(orders_count) as orders_count,
                SUM(items_count) as items_count
            ')
            ->first();

        if (!$aggregate || !$aggregate->orders_count) {
            return;
        }

        $avgOrderValue = $aggregate->orders_count > 0
            ? $aggregate->revenue / $aggregate->orders_count
            : 0;

        \App\Models\DailySale::updateOrCreate(
            ['tenant_id' => $tenant->id, 'date' => $today->toDateString()],
            [
                'revenue' => $aggregate->revenue,
                'orders_count' => $aggregate->orders_count,
                'items_count' => $aggregate->items_count,
                'avg_order_value' => $avgOrderValue,
            ]
        );
    }

    public function syncProducts(Tenant $tenant): int
    {
        $config = SyncConfig::for($tenant);
        $tenant->configureSecondaryConnection();

        $clientTable = $config->table('products');
        $select = $config->toSelect('products', ['id', 'name', 'sku', 'price', 'cost_price', 'stock_quantity', 'category']);

        DB::connection('mysql_secondary')
            ->table($clientTable)
            ->orderBy('id')
            ->chunk(1000, function ($products) use ($tenant) {
                foreach ($products as $product) {
                    \App\Models\Product::updateOrCreate(
                        ['tenant_id' => $tenant->id, 'client_id' => $product->id],
                        [
                            'name' => $product->name ?? '',
                            'sku' => $product->sku ?? null,
                            'price' => $product->price ?? 0,
                            'cost_price' => $product->cost_price ?? null,
                            'stock_quantity' => $product->stock_quantity ?? 0,
                            'category' => $product->category ?? null,
                        ]
                    );
                }
            });

        return \App\Models\Product::where('tenant_id', $tenant->id)->count();
    }

    public function syncCustomers(Tenant $tenant): int
    {
        $config = SyncConfig::for($tenant);
        $tenant->configureSecondaryConnection();

        $clientTable = $config->table('customers');
        $select = $config->toSelect('customers', ['id', 'name', 'email', 'phone', 'created_at']);

        DB::connection('mysql_secondary')
            ->table($clientTable)
            ->orderBy('id')
            ->chunk(1000, function ($customers) use ($tenant, $config) {
                foreach ($customers as $customer) {
                    $orderTable = $config->table('orders');
                    $customerIdCol = $config->column('orders', 'customer_id');
                    $totalCol = $config->column('orders', 'total');

                    $stats = DB::connection('mysql_secondary')
                        ->table($orderTable)
                        ->selectRaw("COUNT(*) as total_orders, COALESCE(SUM($totalCol), 0) as total_revenue, MAX(created_at) as last_order_at")
                        ->where($customerIdCol, $customer->id)
                        ->first();

                    \App\Models\Customer::updateOrCreate(
                        ['tenant_id' => $tenant->id, 'client_id' => $customer->id],
                        [
                            'name' => $customer->name ?? '',
                            'email' => $customer->email ?? null,
                            'phone' => $customer->phone ?? null,
                            'total_orders' => $stats->total_orders ?? 0,
                            'total_revenue' => $stats->total_revenue ?? 0,
                            'last_order_at' => $stats->last_order_at ?? null,
                        ]
                    );
                }
            });

        return \App\Models\Customer::where('tenant_id', $tenant->id)->count();
    }

    public function detectAnomalies(Tenant $tenant): void
    {
        $currentHour = now()->hour;
        $today = now()->toDateString();

        $currentRevenue = \App\Models\HourlySale::where('tenant_id', $tenant->id)
            ->where('date', $today)
            ->where('hour', $currentHour)
            ->value('revenue') ?? 0;

        $history = \App\Models\HourlySale::where('tenant_id', $tenant->id)
            ->where('hour', $currentHour)
            ->where('date', '>=', now()->subDays(7)->toDateString())
            ->where('date', '<', $today)
            ->avg('revenue') ?? 0;

        if ($history > 0 && $currentRevenue < $history * 0.5) {
            $alertService = app(AlertService::class);
            $alertService->createAlert(
                $tenant,
                'revenue_drop',
                'critical',
                "Revenue dropped significantly: current hour ৳{$currentRevenue} vs avg ৳" . round($history, 2),
                ['current' => $currentRevenue, 'average' => $history, 'hour' => $currentHour]
            );
        }
    }

    public function runForTenant(Tenant $tenant, string $type): void
    {
        $method = match ($type) {
            'hourly_sales' => 'syncHourlySales',
            'daily_sales' => 'syncDailySales',
            'products' => 'syncProducts',
            'customers' => 'syncCustomers',
            'anomaly_detection' => 'detectAnomalies',
            default => throw new \InvalidArgumentException("Unknown sync type: {$type}"),
        };

        $this->$method($tenant);
    }
}
