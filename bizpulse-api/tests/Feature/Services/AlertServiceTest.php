<?php

use App\Models\Tenant;
use App\Models\AnomalyAlert;
use App\Services\AlertService;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->tenant = Tenant::factory()->create();
    $this->service = app(AlertService::class);
});

test('activeAlerts returns only non-dismissed alerts', function () {
    AnomalyAlert::factory()->count(3)->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => null,
    ]);
    AnomalyAlert::factory()->count(2)->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => now(),
    ]);

    $alerts = $this->service->activeAlerts($this->tenant);

    expect($alerts)->toHaveCount(3);
});

test('activeAlerts filters by type', function () {
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'type' => 'revenue_drop',
    ]);
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'type' => 'dead_stock',
    ]);

    $alerts = $this->service->activeAlerts($this->tenant, 'revenue_drop');

    expect($alerts)->toHaveCount(1)
        ->and($alerts->first()->type)->toBe('revenue_drop');
});

test('activeAlerts filters by severity', function () {
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'severity' => 'critical',
    ]);
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'severity' => 'warning',
    ]);

    $alerts = $this->service->activeAlerts($this->tenant, null, 'critical');

    expect($alerts)->toHaveCount(1)
        ->and($alerts->first()->severity)->toBe('critical');
});

test('dismiss marks alert as resolved', function () {
    $alert = AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => null,
    ]);

    $this->service->dismiss($alert->id, $this->tenant);

    $alert->refresh();
    expect($alert->dismissed_at)->not->toBeNull();
});

test('dismiss only dismisses alerts belonging to tenant', function () {
    $otherTenant = Tenant::factory()->create();
    $alert = AnomalyAlert::factory()->create([
        'tenant_id' => $otherTenant->id,
        'dismissed_at' => null,
    ]);

    $this->service->dismiss($alert->id, $this->tenant);

    $alert->refresh();
    expect($alert->dismissed_at)->toBeNull();
});

test('createAlert stores alert in database', function () {
    $alert = $this->service->createAlert(
        $this->tenant,
        'revenue_drop',
        'critical',
        'Sales dropped 42%',
        ['current' => 100, 'average' => 172],
    );

    expect($alert)->toBeInstanceOf(AnomalyAlert::class)
        ->and($alert->tenant_id)->toBe($this->tenant->id)
        ->and($alert->type)->toBe('revenue_drop')
        ->and($alert->severity)->toBe('critical')
        ->and($alert->message)->toBe('Sales dropped 42%')
        ->and($alert->meta)->toBe(['current' => 100, 'average' => 172]);
});

test('unreviewedCount returns count of active alerts', function () {
    AnomalyAlert::factory()->count(4)->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => null,
    ]);
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => now(),
    ]);

    $count = $this->service->unreviewedCount($this->tenant);

    expect($count)->toBe(4);
});
