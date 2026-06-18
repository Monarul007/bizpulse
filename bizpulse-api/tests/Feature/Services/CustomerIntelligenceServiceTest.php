<?php

use App\Models\Tenant;
use App\Models\Customer;
use App\Models\Order;
use App\Services\CustomerIntelligenceService;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->tenant = Tenant::factory()->create();
    $this->service = app(CustomerIntelligenceService::class);
});

test('overview returns zeros with no data', function () {
    $result = $this->service->overview($this->tenant);

    expect($result['total_customers'])->toBe(0)
        ->and($result['total_revenue'])->toBe(0.0)
        ->and($result['total_orders'])->toBe(0);
});

test('overview returns aggregate stats', function () {
    Customer::factory()->count(5)->create([
        'tenant_id' => $this->tenant->id,
        'total_revenue' => 1000,
        'total_orders' => 5,
    ]);
    Order::factory()->count(3)->create(['tenant_id' => $this->tenant->id]);

    $result = $this->service->overview($this->tenant);

    expect($result['total_customers'])->toBe(5)
        ->and($result['total_revenue'])->toBe(5000.0)
        ->and($result['total_orders'])->toBe(3);
});

test('rfmSegmentation returns empty when no customers', function () {
    $result = $this->service->rfmSegmentation($this->tenant);

    expect($result['segments'])->toBe([]);
});

test('rfmSegmentation segments customers correctly', function () {
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'last_order_at' => now()->subDay(),
        'total_orders' => 20,
        'total_revenue' => 50000,
    ]);

    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'last_order_at' => now()->subDays(100),
        'total_orders' => 2,
        'total_revenue' => 500,
    ]);

    $result = $this->service->rfmSegmentation($this->tenant);

    expect($result['segments'])->not->toBeEmpty();
    expect($result['distribution']['avg_rfm'])->toBeGreaterThan(0);
});

test('churnAnalysis returns zero values with no data', function () {
    $result = $this->service->churnAnalysis($this->tenant);

    expect($result['total_customers'])->toBe(0);
});

test('churnAnalysis groups by risk level', function () {
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'churn_score' => 0.9,
        'segment' => 'lost',
    ]);
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'churn_score' => 0.5,
    ]);
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'churn_score' => 0.1,
    ]);

    $result = $this->service->churnAnalysis($this->tenant);

    expect($result['total_customers'])->toBe(3)
        ->and($result['by_risk_level'])->toHaveKeys(['high', 'medium', 'low']);
});

test('clvAnalysis returns empty when no customers with orders', function () {
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'total_orders' => 0,
    ]);

    $result = $this->service->clvAnalysis($this->tenant);

    expect($result['overall'])->toBe([]);
});

test('clvAnalysis computes lifetime values', function () {
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'total_revenue' => 12000,
        'total_orders' => 12,
        'last_order_at' => now()->subMonth(),
    ]);
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'total_revenue' => 6000,
        'total_orders' => 6,
        'last_order_at' => now()->subMonths(2),
    ]);

    $result = $this->service->clvAnalysis($this->tenant);

    expect($result['overall']['avg_clv_historical'])->toBe(9000.0)
        ->and($result['by_segment'])->not->toBeEmpty()
        ->and($result['top_customers'])->toHaveCount(2);
});

test('overview is cached', function () {
    $this->service->overview($this->tenant);

    Customer::factory()->create(['tenant_id' => $this->tenant->id]);

    $cached = $this->service->overview($this->tenant);

    expect($cached['total_customers'])->toBe(0);
});
