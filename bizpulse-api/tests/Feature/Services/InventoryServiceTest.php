<?php

use App\Models\Tenant;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\HourlySale;
use App\Models\AnomalyAlert;
use App\Services\InventoryService;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->tenant = Tenant::factory()->create();
    $this->service = app(InventoryService::class);
});

test('deadStock returns empty when no products', function () {
    $result = $this->service->deadStock($this->tenant);

    expect($result)->toBe([]);
});

test('deadStock returns only products with stock and no recent orders', function () {
    $active = Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 10,
    ]);
    $recentOrder = Order::factory()->create([
        'tenant_id' => $this->tenant->id,
        'ordered_at' => now()->subDays(1),
    ]);
    OrderItem::factory()->create([
        'tenant_id' => $this->tenant->id,
        'order_id' => $recentOrder->id,
        'product_client_id' => $active->client_id,
    ]);

    $dead = Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 50,
        'price' => 100,
        'cost_price' => 60,
    ]);
    $outOfStock = Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 0,
    ]);

    $result = $this->service->deadStock($this->tenant);

    expect($result)->toHaveCount(1)
        ->and($result[0]['name'])->toBe($dead->name)
        ->and($result[0]['capital_at_risk'])->toBe(3000.0);
});

test('reorderSuggestions returns products nearing stockout', function () {
    $fast = Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 10,
    ]);
    $rows = [];
    foreach (range(1, 30) as $day) {
        $rows[] = [
            'tenant_id' => $this->tenant->id,
            'date' => now()->subDays($day)->toDateString(),
            'hour' => 10,
            'revenue' => 1000,
            'orders_count' => 5,
            'items_count' => 50,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    HourlySale::insert($rows);

    $result = $this->service->reorderSuggestions($this->tenant);

    expect($result)->toHaveCount(1);
});

test('marginAnalysis returns margin data with summary', function () {
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'price' => 200,
        'cost_price' => 100,
        'stock_quantity' => 10,
    ]);
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'price' => 100,
        'cost_price' => 80,
        'stock_quantity' => 5,
    ]);

    $result = $this->service->marginAnalysis($this->tenant);

    expect($result)->toHaveKeys(['products', 'summary'])
        ->and($result['summary']['total_products'])->toBe(2)
        ->and($result['products'][0]['margin_pct'])->toBe(50.0);
});

test('marginAnalysis handles products without cost_price', function () {
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'price' => 200,
        'cost_price' => null,
    ]);

    $result = $this->service->marginAnalysis($this->tenant);

    expect($result['summary']['total_products'])->toBe(0);
});

test('detectDeadStockAlerts creates alerts for high-value dead stock', function () {
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 500,
        'cost_price' => 500,
        'price' => 1000,
    ]);

    $this->service->detectDeadStockAlerts($this->tenant);

    expect(AnomalyAlert::where('type', 'dead_stock')->count())->toBe(1)
        ->and(AnomalyAlert::first()->severity)->toBe('critical');
});

test('detectDeadStockAlerts skips low-value dead stock', function () {
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 5,
        'cost_price' => 10,
        'price' => 20,
    ]);

    $this->service->detectDeadStockAlerts($this->tenant);

    expect(AnomalyAlert::count())->toBe(0);
});
