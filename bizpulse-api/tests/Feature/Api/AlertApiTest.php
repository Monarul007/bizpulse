<?php

use App\Models\Tenant;
use App\Models\User;
use App\Models\AnomalyAlert;
use Laravel\Sanctum\Sanctum;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->tenant = Tenant::factory()->create();
    $this->user = User::factory()->create([
        'tenant_id' => $this->tenant->id,
        'role' => 'user',
    ]);
    Sanctum::actingAs($this->user);
});

test('alerts index returns paginated alerts', function () {
    AnomalyAlert::factory()->count(5)->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => null,
    ]);

    $response = $this->getJson(route('api.alerts.index'));

    $response->assertOk()
        ->assertJsonStructure(['data', 'meta' => ['next_cursor', 'previous_cursor', 'unreviewed_count']])
        ->assertJsonCount(5, 'data')
        ->assertJsonPath('meta.unreviewed_count', 5);
});

test('alerts index filters by type', function () {
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'type' => 'revenue_drop',
    ]);
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'type' => 'dead_stock',
    ]);

    $response = $this->getJson(route('api.alerts.index', ['type' => 'revenue_drop']));

    $response->assertOk()
        ->assertJsonCount(1, 'data');
});

test('alerts index filters by severity', function () {
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'severity' => 'critical',
    ]);
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'severity' => 'warning',
    ]);

    $response = $this->getJson(route('api.alerts.index', ['severity' => 'critical']));

    $response->assertOk()
        ->assertJsonCount(1, 'data');
});

test('alerts index does not include dismissed alerts', function () {
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => null,
    ]);
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => now(),
    ]);

    $response = $this->getJson(route('api.alerts.index'));

    $response->assertOk()
        ->assertJsonCount(1, 'data');
});

test('dismiss endpoint marks alert as dismissed', function () {
    $alert = AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'dismissed_at' => null,
    ]);

    $response = $this->postJson(route('api.alerts.dismiss', $alert->id));

    $response->assertOk()
        ->assertJson(['message' => 'Alert dismissed']);

    $alert->refresh();
    expect($alert->dismissed_at)->not->toBeNull();
});

test('dismiss endpoint returns success even for non-existent alert', function () {
    $response = $this->postJson(route('api.alerts.dismiss', 999));

    $response->assertOk();
});

test('alert resource shape is correct', function () {
    AnomalyAlert::factory()->create([
        'tenant_id' => $this->tenant->id,
        'type' => 'revenue_drop',
        'severity' => 'critical',
        'message' => 'Test alert',
        'meta' => ['key' => 'value'],
    ]);

    $response = $this->getJson(route('api.alerts.index'));

    $response->assertOk();
    $alert = $response->json('data')[0];

    expect($alert)->toHaveKeys(['id', 'type', 'severity', 'message', 'meta', 'created_at', 'is_dismissed'])
        ->and($alert['type'])->toBe('revenue_drop')
        ->and($alert['severity'])->toBe('critical')
        ->and($alert['message'])->toBe('Test alert')
        ->and($alert['meta'])->toBe(['key' => 'value'])
        ->and($alert['is_dismissed'])->toBeFalse();
});

test('api requires authentication for alerts', function () {
    $this->app->get('auth')->forgetGuards();

    $response = $this->getJson(route('api.alerts.index'));

    $response->assertUnauthorized();
});
