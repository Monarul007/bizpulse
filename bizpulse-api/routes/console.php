<?php

use App\Services\InventoryService;
use App\Services\SyncService;
use App\Models\Tenant;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::call(function () {
    Tenant::where('is_active', true)->each(function (Tenant $tenant) {
        if (!$tenant->sync_config) {
            return;
        }
        try {
            app(SyncService::class)->syncHourlySales($tenant);
        } catch (\Exception $e) {
            Log::error("Sync failed for tenant {$tenant->id}: {$e->getMessage()}");
        }
    });
})->name('sync-hourly-sales')->everyFiveMinutes();

Schedule::call(function () {
    Tenant::where('is_active', true)->whereNotNull('sync_config')->each(function (Tenant $tenant) {
        try {
            app(SyncService::class)->syncDailySales($tenant);
        } catch (\Exception $e) {
            Log::error("Daily sync failed for tenant {$tenant->id}: {$e->getMessage()}");
        }
    });
})->name('sync-daily-sales')->hourly();

Schedule::call(function () {
    Tenant::where('is_active', true)->whereNotNull('sync_config')->each(function (Tenant $tenant) {
        try {
            app(SyncService::class)->syncProducts($tenant);
        } catch (\Exception $e) {
            Log::error("Product sync failed for tenant {$tenant->id}: {$e->getMessage()}");
        }
    });
})->name('sync-products')->everyFifteenMinutes();

Schedule::call(function () {
    Tenant::where('is_active', true)->whereNotNull('sync_config')->each(function (Tenant $tenant) {
        try {
            app(SyncService::class)->syncCustomers($tenant);
        } catch (\Exception $e) {
            Log::error("Customer sync failed for tenant {$tenant->id}: {$e->getMessage()}");
        }
    });
})->name('sync-customers')->everyFifteenMinutes();

Schedule::call(function () {
    Tenant::where('is_active', true)->whereNotNull('sync_config')->each(function (Tenant $tenant) {
        try {
            app(SyncService::class)->detectAnomalies($tenant);
        } catch (\Exception $e) {
            Log::error("Anomaly detection failed for tenant {$tenant->id}: {$e->getMessage()}");
        }
    });
})->name('detect-anomalies')->everyFifteenMinutes();

Schedule::call(function () {
    Tenant::where('is_active', true)->whereNotNull('sync_config')->each(function (Tenant $tenant) {
        try {
            app(InventoryService::class)->detectDeadStockAlerts($tenant);
        } catch (\Exception $e) {
            Log::error("Dead stock detection failed for tenant {$tenant->id}: {$e->getMessage()}");
        }
    });
})->name('detect-dead-stock')->hourly();

Schedule::call(function () {
    Tenant::where('is_active', true)->whereNotNull('sync_config')->each(function (Tenant $tenant) {
        try {
            app(InventoryService::class)->detectReorderAlerts($tenant);
        } catch (\Exception $e) {
            Log::error("Reorder detection failed for tenant {$tenant->id}: {$e->getMessage()}");
        }
    });
})->name('detect-reorder-needs')->hourly();
