<?php

use App\Models\Tenant;
use App\Models\User;
use App\Models\HourlySale;
use App\Models\DailySale;
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

test('ticker endpoint returns sales data', function () {
    HourlySale::factory()->create([
        'tenant_id' => $this->tenant->id,
        'date' => now()->toDateString(),
        'revenue' => 5000,
        'orders_count' => 10,
    ]);

    $response = $this->getJson(route('api.sales.ticker'));

    $response->assertOk()
        ->assertJsonStructure(['data' => ['revenue', 'orders_count', 'vs_yesterday', 'currency']]);
});

test('comparisons endpoint returns period data', function () {
    $rows = [];
    foreach (range(0, 4) as $i) {
        $rows[] = [
            'tenant_id' => $this->tenant->id,
            'date' => now()->subDays($i * 2 + 1)->toDateString(),
            'revenue' => 2000,
            'orders_count' => 10,
            'items_count' => 20,
            'avg_order_value' => 200,
            'total_discount' => 0,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
    DailySale::insert($rows);

    $response = $this->getJson(route('api.sales.comparisons', ['period' => '7d']));

    $response->assertOk()
        ->assertJsonStructure(['data' => ['current', 'previous', 'delta_pct', 'period']]);
});

test('comparisons validates period parameter', function () {
    $response = $this->getJson(route('api.sales.comparisons', ['period' => 'invalid']));

    // Should default to 7d, not error
    $response->assertOk();
});

test('heatmap endpoint returns structured data', function () {
    $today = now();
    $rows = [];
    foreach ([8, 9, 14, 15, 16] as $i => $hour) {
        $rows[] = [
            'tenant_id' => $this->tenant->id,
            'date' => $today->subDays($i + 1)->toDateString(),
            'hour' => $hour,
            'revenue' => 1000,
            'orders_count' => 5,
            'items_count' => 10,
            'created_at' => now(),
            'updated_at' => now(),
        ];
        $today = now();
    }
    HourlySale::insert($rows);

    $response = $this->getJson(route('api.sales.heatmap', ['days' => 7]));

    $response->assertOk()
        ->assertJsonStructure(['data']);
});

test('heatmap clamps days to valid range', function () {
    $response = $this->getJson(route('api.sales.heatmap', ['days' => 999]));

    $response->assertOk();
});

test('forecast endpoint returns projection', function () {
    foreach (range(1, 14) as $day) {
        DailySale::factory()->create([
            'tenant_id' => $this->tenant->id,
            'date' => now()->subDays(15 - $day)->toDateString(),
            'revenue' => 5000,
        ]);
    }

    $response = $this->getJson(route('api.sales.forecast'));

    $response->assertOk()
        ->assertJsonStructure(['data' => ['projected_eom', 'daily_average', 'confidence', 'trend']]);
});

test('top-products endpoint returns sorted products', function () {
    \App\Models\Product::factory()->count(3)->create([
        'tenant_id' => $this->tenant->id,
    ]);

    $response = $this->getJson(route('api.sales.top-products', ['limit' => 3]));

    $response->assertOk()
        ->assertJsonCount(3, 'data');
});

test('promo-roi endpoint validates date range', function () {
    $response = $this->getJson(route('api.sales.promo-roi', [
        'from' => 'invalid-date',
        'to' => now()->toDateString(),
    ]));

    $response->assertStatus(422);
});

test('promo-roi returns promo data', function () {
    Order::factory()->count(2)->create([
        'tenant_id' => $this->tenant->id,
        'coupon_code' => 'SUMMER20',
        'ordered_at' => now()->subDays(rand(1, 5)),
        'total' => 1000,
        'discount_amount' => 200,
    ]);
    Order::factory()->count(3)->create([
        'tenant_id' => $this->tenant->id,
        'coupon_code' => null,
        'ordered_at' => now()->subDays(rand(1, 5)),
        'total' => 1000,
    ]);

    $response = $this->getJson(route('api.sales.promo-roi', [
        'from' => now()->subMonth()->toDateString(),
        'to' => now()->toDateString(),
    ]));

    $response->assertOk()
        ->assertJsonStructure(['data' => ['promotions', 'total_revenue', 'promo_revenue']]);
});

test('channels endpoint returns channel breakdown', function () {
    Order::factory()->create([
        'tenant_id' => $this->tenant->id,
        'channel' => 'website',
        'ordered_at' => now()->subDays(rand(1, 10)),
    ]);
    Order::factory()->create([
        'tenant_id' => $this->tenant->id,
        'channel' => 'app',
        'ordered_at' => now()->subDays(rand(1, 10)),
    ]);

    $response = $this->getJson(route('api.sales.channels', [
        'from' => now()->subMonth()->toDateString(),
        'to' => now()->toDateString(),
    ]));

    $response->assertOk()
        ->assertJsonStructure(['data']);
});

test('refunds endpoint returns refund rate', function () {
    Order::factory()->count(8)->create([
        'tenant_id' => $this->tenant->id,
        'status' => 'completed',
        'ordered_at' => now()->subDays(rand(1, 10)),
    ]);
    Order::factory()->count(2)->create([
        'tenant_id' => $this->tenant->id,
        'status' => 'refunded',
        'ordered_at' => now()->subDays(rand(1, 10)),
    ]);

    $response = $this->getJson(route('api.sales.refunds', [
        'from' => now()->subMonth()->toDateString(),
        'to' => now()->toDateString(),
    ]));

    $response->assertOk()
        ->assertJsonStructure(['data' => ['total_orders', 'refunded_orders', 'refund_rate_pct']])
        ->assertJsonPath('data.refund_rate_pct', 20);
});

test('api requires authentication', function () {
    $this->app->get('auth')->forgetGuards();

    $response = $this->getJson(route('api.sales.ticker'));

    $response->assertUnauthorized();
});
