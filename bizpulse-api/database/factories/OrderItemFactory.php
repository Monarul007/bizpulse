<?php

namespace Database\Factories;

use App\Models\OrderItem;
use App\Models\Order;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'order_id' => Order::factory(),
            'client_id' => (string) fake()->unique()->numberBetween(1, 99999),
            'product_client_id' => (string) fake()->numberBetween(1, 1000),
            'quantity' => fake()->numberBetween(1, 5),
            'unit_price' => fake()->randomFloat(2, 50, 5000),
            'subtotal' => fn (array $a) => $a['quantity'] * $a['unit_price'],
        ];
    }
}
