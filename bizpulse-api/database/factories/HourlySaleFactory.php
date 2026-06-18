<?php

namespace Database\Factories;

use App\Models\HourlySale;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class HourlySaleFactory extends Factory
{
    protected $model = HourlySale::class;

    public function definition(): array
    {
        $date = fake()->dateTimeBetween('-7 days', 'now')->format('Y-m-d');
        $hour = fake()->numberBetween(0, 23);

        return [
            'tenant_id' => Tenant::factory(),
            'date' => $date,
            'hour' => $hour,
            'revenue' => fake()->randomFloat(2, 100, 50000),
            'orders_count' => fake()->numberBetween(1, 50),
            'items_count' => fake()->numberBetween(1, 200),
        ];
    }
}
