<?php

use App\Models\Tenant;
use App\Models\User;
use App\Models\Product;
use App\Models\HourlySale;
use App\Models\Order;
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

test('dead-stock endpoint returns products without recent orders', function () {
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 10,
    ]);

    $response = $this->getJson(route('api.inventory.dead-stock'));

    $response->assertOk()
        ->assertJsonStructure(['data']);
});

test('reorder-suggestions endpoint returns suggestions', function () {
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'stock_quantity' => 5,
    ]);
    $rows = [];
    foreach (range(1, 30) as $day) {
        $rows[] = [
            'tenant_id' => $this->tenant->id,
            'date' => now()->subDays($day)->toDateString(),
            'hour' => 10,
            'revenue' => 1000,
            'orders_count' => 5,
            'items_count' => 100,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    HourlySale::insert($rows);

    $response = $this->getJson(route('api.inventory.reorder-suggestions'));

    $response->assertOk()
        ->assertJsonStructure(['data']);
});

test('margin-analysis endpoint returns margin data', function () {
    Product::factory()->create([
        'tenant_id' => $this->tenant->id,
        'price' => 200,
        'cost_price' => 100,
        'stock_quantity' => 10,
    ]);

    $response = $this->getJson(route('api.inventory.margin-analysis'));

    $response->assertOk()
        ->assertJsonStructure(['data' => ['products', 'summary']]);
});

test('seasonal-demand endpoint returns demand data', function () {
    $response = $this->getJson(route('api.inventory.seasonal-demand'));

    $response->assertOk()
        ->assertJsonStructure(['data' => ['current_month_sales', 'avg_monthly_sales', 'seasonal_lift_pct', 'is_seasonal_peak']]);
});
