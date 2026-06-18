<?php

use App\Models\Tenant;
use App\Models\HourlySale;
use App\Models\DailySale;
use App\Models\Product;
use App\Models\Order;
use App\Services\SalesService;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->tenant = Tenant::factory()->create();
    $this->service = app(SalesService::class);
});

test('ticker returns zero values when no sales exist', function () {
    $result = $this->service->ticker($this->tenant);

    expect($result['revenue'])->toBe(0.0)
        ->and($result['orders_count'])->toBe(0)
        ->and($result['currency'])->toBe('BDT');
});

test('ticker calculates today revenue', function () {
    $today = now()->toDateString();
    HourlySale::insert([
        ['tenant_id' => $this->tenant->id, 'date' => $today, 'hour' => 8, 'revenue' => 1000, 'orders_count' => 5, 'items_count' => 10, 'created_at' => now(), 'updated_at' => now()],
        ['tenant_id' => $this->tenant->id, 'date' => $today, 'hour' => 9, 'revenue' => 1000, 'orders_count' => 5, 'items_count' => 10, 'created_at' => now(), 'updated_at' => now()],
        ['tenant_id' => $this->tenant->id, 'date' => $today, 'hour' => 10, 'revenue' => 1000, 'orders_count' => 5, 'items_count' => 10, 'created_at' => now(), 'updated_at' => now()],
    ]);

    $result = $this->service->ticker($this->tenant);

    expect($result['revenue'])->toBe(3000.0)
        ->and($result['orders_count'])->toBe(15);
});

test('ticker calculates vs yesterday delta', function () {
    DailySale::insert([
        'tenant_id' => $this->tenant->id,
        'date' => now()->subDay()->toDateString(),
        'revenue' => 2000,
        'orders_count' => 10,
        'items_count' => 20,
        'avg_order_value' => 200,
        'total_discount' => 0,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    HourlySale::insert([
        'tenant_id' => $this->tenant->id,
        'date' => now()->toDateString(),
        'hour' => 10,
        'revenue' => 1000,
        'orders_count' => 5,
        'items_count' => 10,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    $result = $this->service->ticker($this->tenant);

    expect($result['vs_yesterday'])->toBe(-50.0)
        ->and($result['vs_yesterday_label'])->toBe('-50%');
});

test('comparisons returns 7d by default', function () {
    $rows = [];
    foreach (range(0, 4) as $i) {
        $rows[] = [
            'tenant_id' => $this->tenant->id,
            'date' => now()->subDays($i + 1)->toDateString(),
            'revenue' => 1000,
            'orders_count' => 10,
            'items_count' => 20,
            'avg_order_value' => 100,
            'total_discount' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    DailySale::insert($rows);

    $result = $this->service->comparisons($this->tenant);

    expect($result)->toHaveKey('current')
        ->and($result)->toHaveKey('previous')
        ->and($result['period'])->toBe('last_7_days');
});

test('comparisons returns zero delta when no previous data', function () {
    DailySale::factory()->create([
        'tenant_id' => $this->tenant->id,
        'date' => now()->toDateString(),
        'revenue' => 1000,
    ]);

    $result = $this->service->comparisons($this->tenant);

    expect($result['delta_pct'])->toBe(0)
        ->and($result['previous'])->toBe(0.0);
});

test('heatmap returns grouped by day of week', function () {
    $today = now();
    $rows = [];
    foreach ([8, 9, 10, 11, 12, 14, 15, 16, 17, 18] as $idx => $hour) {
        $rows[] = [
            'tenant_id' => $this->tenant->id,
            'date' => $today->subDays($idx % 5)->toDateString(),
            'hour' => $hour,
            'revenue' => 500,
            'orders_count' => 5,
            'items_count' => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ];
        $today = now();
    }
    HourlySale::insert($rows);

    $result = $this->service->heatmap($this->tenant, 7);

    expect($result)->not->toBeEmpty();
    foreach ($result as $day => $hours) {
        foreach ($hours as $hour => $data) {
            expect($data)->toHaveKeys(['revenue', 'orders']);
        }
    }
});

test('forecast returns null with insufficient data', function () {
    $result = $this->service->forecast($this->tenant);

    expect($result)->toHaveKey('message')
        ->and($result['message'])->toContain('Insufficient data');
});

test('forecast calculates projection with enough data', function () {
    $rows = [];
    foreach (range(1, 14) as $day) {
        $rows[] = [
            'tenant_id' => $this->tenant->id,
            'date' => now()->subDays(15 - $day)->toDateString(),
            'revenue' => 5000 + ($day * 100),
            'orders_count' => 10,
            'items_count' => 20,
            'avg_order_value' => 500,
            'total_discount' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    DailySale::insert($rows);

    $result = $this->service->forecast($this->tenant);

    expect($result)->toHaveKey('projected_eom')
        ->and($result['projected_eom'])->toBeGreaterThan(0)
        ->and($result)->toHaveKey('daily_average')
        ->and($result)->toHaveKey('confidence');
});

test('topProducts returns limited products sorted by stock', function () {
    Product::factory()->count(15)->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => fn () => rand(1, 100),
    ]);

    $result = $this->service->topProducts($this->tenant, 5);

    expect($result)->toHaveCount(5);
    $stocks = array_column($result, 'stock_quantity');
    for ($i = 0; $i < count($stocks) - 1; $i++) {
        expect($stocks[$i])->toBeGreaterThanOrEqual($stocks[$i + 1]);
    }
});

test('refunds calculates rate correctly', function () {
    Order::factory()->count(8)->create([
        'tenant_id' => $this->tenant->id,
        'status' => 'completed',
        'total' => 1000,
        'ordered_at' => now()->subDays(rand(1, 10)),
    ]);
    Order::factory()->count(2)->create([
        'tenant_id' => $this->tenant->id,
        'status' => 'refunded',
        'total' => 1000,
        'ordered_at' => now()->subDays(rand(1, 10)),
    ]);

    $result = $this->service->refunds(
        $this->tenant,
        now()->subMonth()->toDateString(),
        now()->toDateString()
    );

    expect($result['total_orders'])->toBe(10)
        ->and($result['refunded_orders'])->toBe(2)
        ->and($result['refund_rate_pct'])->toBe(20.0);
});
