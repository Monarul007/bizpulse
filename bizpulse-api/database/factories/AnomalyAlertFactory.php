<?php

namespace Database\Factories;

use App\Models\AnomalyAlert;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnomalyAlertFactory extends Factory
{
    protected $model = AnomalyAlert::class;

    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'type' => fake()->randomElement(['revenue_drop', 'dead_stock', 'churn_risk', 'stockout_warning', 'anomaly']),
            'severity' => fake()->randomElement(['critical', 'warning', 'info']),
            'message' => fake()->sentence(),
            'meta' => ['key' => fake()->word()],
            'dismissed_at' => null,
        ];
    }
}
