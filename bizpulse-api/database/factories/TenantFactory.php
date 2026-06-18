<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class TenantFactory extends Factory
{
    protected $model = Tenant::class;

    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'slug' => fake()->unique()->slug(1),
            'mysql_host' => '127.0.0.1',
            'mysql_port' => '3306',
            'mysql_database' => fake()->word(),
            'mysql_username' => 'readonly',
            'mysql_password' => 'secret',
            'is_active' => true,
            'sync_config' => null,
            'rate_limit_per_minute' => 60,
        ];
    }
}
