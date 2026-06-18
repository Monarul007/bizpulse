<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'tenant_id' => Tenant::factory(),
            'client_id' => (string) fake()->unique()->numberBetween(1, 99999),
            'name' => fake()->words(3, true),
            'sku' => strtoupper(fake()->unique()->lexify('SKU-????')),
            'price' => fake()->randomFloat(2, 50, 5000),
            'cost_price' => fake()->randomFloat(2, 20, 3000),
            'stock_quantity' => fake()->numberBetween(0, 500),
            'category' => fake()->randomElement(['Skincare', 'Haircare', 'Makeup', 'Fragrance', 'Body Care']),
        ];
    }
}
