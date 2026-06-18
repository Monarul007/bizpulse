<?php

namespace App\Services;

use App\Models\Tenant;
use App\Models\AnomalyAlert;
use Illuminate\Support\Facades\Cache;

class AdminDashboardService
{
    public function stats(): array
    {
        $cacheKey = 'admin:dashboard:stats';

        return Cache::remember($cacheKey, 300, function () {
            $totalTenants = Tenant::count();
            $activeTenants = Tenant::where('is_active', true)->count();
            $configuredTenants = Tenant::whereNotNull('sync_config')
                ->get()
                ->reject(fn ($t) => empty($t->sync_config))
                ->count();
            $pendingAlerts = AnomalyAlert::whereNull('dismissed_at')->count();

            // Count tenants with successful recent syncs (last 24h)
            $recentlySynced = Tenant::whereHas('hourlySales', function ($q) {
                $q->where('created_at', '>=', now()->subDay());
            })->count();

            return [
                'total_tenants' => $totalTenants,
                'active_connections' => $activeTenants,
                'configured_tenants' => $configuredTenants,
                'recently_synced' => $recentlySynced,
                'pending_alerts' => $pendingAlerts,
                'inactive_tenants' => $totalTenants - $activeTenants,
            ];
        });
    }

    public function recentActivity(): array
    {
        return Tenant::withCount(['hourlySales', 'dailySales', 'anomalyAlerts'])
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get()
            ->map(fn ($t) => [
                'id' => $t->id,
                'name' => $t->name,
                'slug' => $t->slug,
                'is_active' => $t->is_active,
                'has_mapping' => !empty($t->sync_config),
                'hourly_syncs' => $t->hourly_sales_count,
                'daily_records' => $t->daily_sales_count,
                'alerts_count' => $t->anomaly_alerts_count,
                'updated_at' => $t->updated_at->diffForHumans(),
            ])
            ->toArray();
    }
}
