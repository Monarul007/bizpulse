<?php

use App\Models\User;
use App\Models\Tenant;
use App\Models\Customer;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->tenant = Tenant::factory()->create();
    $this->user = User::factory()->create([
        'tenant_id' => $this->tenant->id,
        'role' => 'manager',
    ]);
    $this->token = $this->user->createToken('test')->plainTextToken;
});

test('overview endpoint returns stats', function () {
    Customer::factory()->count(3)->create(['tenant_id' => $this->tenant->id]);

    $this->withToken($this->token)
        ->getJson('/api/customer/overview')
        ->assertOk()
        ->assertJsonStructure(['data' => ['total_customers', 'total_revenue', 'total_orders']]);
});

test('rfm endpoint returns segments', function () {
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'last_order_at' => now(),
        'total_orders' => 5,
        'total_revenue' => 10000,
    ]);

    $this->withToken($this->token)
        ->getJson('/api/customer/rfm')
        ->assertOk()
        ->assertJsonStructure(['data' => ['segments', 'distribution']]);
});

test('churn endpoint returns risk analysis', function () {
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'churn_score' => 0.8,
    ]);

    $this->withToken($this->token)
        ->getJson('/api/customer/churn')
        ->assertOk()
        ->assertJsonStructure(['data' => ['total_customers', 'by_risk_level']]);
});

test('clv endpoint returns value analysis', function () {
    Customer::factory()->create([
        'tenant_id' => $this->tenant->id,
        'total_revenue' => 10000,
        'total_orders' => 10,
    ]);

    $this->withToken($this->token)
        ->getJson('/api/customer/clv')
        ->assertOk()
        ->assertJsonStructure(['data' => ['overall', 'by_segment', 'top_customers']]);
});

test('customer endpoints require authentication', function () {
    $this->getJson('/api/customer/overview')->assertUnauthorized();
    $this->getJson('/api/customer/rfm')->assertUnauthorized();
    $this->getJson('/api/customer/churn')->assertUnauthorized();
    $this->getJson('/api/customer/clv')->assertUnauthorized();
});
