<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@bizpulse.com',
            'password' => bcrypt('admin123'),
            'role' => 'admin',
            'tenant_id' => null,
        ]);
    }
}
