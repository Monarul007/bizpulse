<?php

use App\Models\Tenant;
use App\Services\TenantService;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('allTenantsWithStatus returns paginated tenants', function () {
    Tenant::factory()->count(5)->create();

    $service = app(TenantService::class);
    $result = $service->allTenantsWithStatus();

    expect($result)->toHaveCount(5)
        ->and($result->total())->toBe(5);
});

test('allTenantsWithStatus includes expected fields', function () {
    $tenant = Tenant::factory()->create([
        'name' => 'Test Store',
        'slug' => 'test-store',
        'is_active' => true,
        'sync_config' => ['orders' => ['table' => 'orders']],
    ]);

    $service = app(TenantService::class);
    $result = $service->allTenantsWithStatus();
    $first = $result->first();

    expect($first->name)->toBe('Test Store')
        ->and($first->slug)->toBe('test-store')
        ->and($first->is_active)->toBeTrue()
        ->and($first->sync_config)->not->toBeNull();
});

test('saveMapping updates sync_config', function () {
    $tenant = Tenant::factory()->create(['sync_config' => null]);

    $mapping = ['orders' => ['table' => 'orders', 'columns' => ['id' => 'id']]];

    $service = app(TenantService::class);
    $service->saveMapping($tenant, $mapping);

    $tenant->refresh();
    expect($tenant->sync_config)->toBe($mapping);
});

test('testConnection handles missing mysql_secondary config gracefully', function () {
    $tenant = Tenant::factory()->create([
        'mysql_host' => 'invalid-host',
        'mysql_database' => 'test_db',
    ]);

    $service = app(TenantService::class);
    $result = $service->testConnection($tenant);

    expect($result['success'])->toBeFalse()
        ->and($result['message'])->toContain('Connection failed');
});

test('testConnection sets up secondary connection config', function () {
    $tenant = Tenant::factory()->create([
        'mysql_host' => '192.168.1.1',
        'mysql_port' => '3306',
        'mysql_database' => 'client_db',
        'mysql_username' => 'readonly_user',
        'mysql_password' => 'secret',
    ]);

    $tenant->configureSecondaryConnection();

    expect(config('database.connections.mysql_secondary.host'))->toBe('192.168.1.1')
        ->and(config('database.connections.mysql_secondary.database'))->toBe('client_db');
});
