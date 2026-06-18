<?php

use App\Models\Tenant;
use App\Models\AnomalyAlert;
use App\Models\HourlySale;
use App\Services\AdminDashboardService;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('stats returns correct counts with no data', function () {
    $service = app(AdminDashboardService::class);
    $stats = $service->stats();

    expect($stats['total_tenants'])->toBe(0)
        ->and($stats['active_connections'])->toBe(0)
        ->and($stats['configured_tenants'])->toBe(0)
        ->and($stats['pending_alerts'])->toBe(0)
        ->and($stats['inactive_tenants'])->toBe(0);
});

test('stats counts tenants correctly', function () {
    Tenant::factory()->count(3)->create(['is_active' => true]);
    Tenant::factory()->count(2)->create(['is_active' => false]);

    $service = app(AdminDashboardService::class);
    $stats = $service->stats();

    expect($stats['total_tenants'])->toBe(5)
        ->and($stats['active_connections'])->toBe(3)
        ->and($stats['inactive_tenants'])->toBe(2);
});

test('stats counts pending alerts', function () {
    $tenant = Tenant::factory()->create();
    AnomalyAlert::factory()->count(3)->create([
        'tenant_id' => $tenant->id,
        'dismissed_at' => null,
    ]);
    AnomalyAlert::factory()->count(2)->create([
        'tenant_id' => $tenant->id,
        'dismissed_at' => now(),
    ]);

    $service = app(AdminDashboardService::class);
    $stats = $service->stats();

    expect($stats['pending_alerts'])->toBe(3);
});

test('stats counts recently synced tenants', function () {
    $synced = Tenant::factory()->create();
    HourlySale::factory()->create([
        'tenant_id' => $synced->id,
        'created_at' => now()->subHours(2),
    ]);

    $notSynced = Tenant::factory()->create();

    $service = app(AdminDashboardService::class);
    $stats = $service->stats();

    expect($stats['recently_synced'])->toBe(1);
});

test('recentActivity returns latest tenants with counts', function () {
    $tenant = Tenant::factory()->create(['sync_config' => ['orders' => ['table' => 'orders']]]);
    HourlySale::factory()->count(3)->create(['tenant_id' => $tenant->id]);
    AnomalyAlert::factory()->count(2)->create(['tenant_id' => $tenant->id]);

    $service = app(AdminDashboardService::class);
    $activity = $service->recentActivity();

    expect($activity)->toHaveCount(1);
    expect($activity[0])->toMatchArray([
        'id' => $tenant->id,
        'name' => $tenant->name,
        'has_mapping' => true,
    ]);
});

test('recentActivity returns empty when no tenants exist', function () {
    $service = app(AdminDashboardService::class);
    expect($service->recentActivity())->toBe([]);
});

test('stats is cached and returns same result on repeated call', function () {
    $service = app(AdminDashboardService::class);
    $first = $service->stats();

    Tenant::factory()->create();

    $second = $service->stats();

    expect($second)->toEqual($first);
});
