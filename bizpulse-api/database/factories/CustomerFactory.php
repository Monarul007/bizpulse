<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'client_id' => (string) fake()->unique()->numberBetween(1, 99999),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'total_revenue' => fake()->randomFloat(2, 500, 100000),
            'total_orders' => fake()->numberBetween(1, 50),
            'last_order_at' => fake()->dateTimeBetween('-60 days', 'now'),
            'segment' => fake()->randomElement(['champion', 'loyal', 'at_risk', 'lost', 'new']),
            'churn_score' => fake()->randomFloat(2, 0, 1),
        ];
    }
}
