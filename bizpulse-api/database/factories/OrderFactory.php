<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'client_id' => (string) fake()->unique()->numberBetween(1, 99999),
            'customer_id' => (string) fake()->numberBetween(1, 10000),
            'ordered_at' => fake()->dateTimeBetween('-30 days', 'now'),
            'total' => fake()->randomFloat(2, 200, 15000),
            'status' => fake()->randomElement(['pending', 'completed', 'refunded', 'cancelled']),
            'items_count' => fake()->numberBetween(1, 10),
            'coupon_code' => fake()->optional(0.3)->word(),
            'discount_amount' => fake()->randomFloat(2, 0, 1000),
            'channel' => fake()->randomElement(['website', 'app', 'facebook', 'direct']),
        ];
    }
}
