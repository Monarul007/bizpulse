<?php

namespace Database\Factories;

use App\Models\DailySale;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class DailySaleFactory extends Factory
{
    protected $model = DailySale::class;

    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'date' => fake()->unique()->dateTimeBetween('-30 days', 'now')->format('Y-m-d'),
            'revenue' => fake()->randomFloat(2, 1000, 200000),
            'orders_count' => fake()->numberBetween(10, 500),
            'items_count' => fake()->numberBetween(10, 2000),
            'avg_order_value' => fake()->randomFloat(2, 200, 2000),
            'total_discount' => fake()->randomFloat(2, 0, 5000),
        ];
    }
}
