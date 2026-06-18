<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Tenant extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'mysql_host',
        'mysql_port',
        'mysql_database',
        'mysql_username',
        'mysql_password',
        'is_active',
        'sync_config',
        'rate_limit_per_minute',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sync_config' => 'array',
            'rate_limit_per_minute' => 'integer',
        ];
    }

    public function configureSecondaryConnection(): void
    {
        config([
            'database.connections.mysql_secondary.host' => $this->mysql_host,
            'database.connections.mysql_secondary.port' => $this->mysql_port,
            'database.connections.mysql_secondary.database' => $this->mysql_database,
            'database.connections.mysql_secondary.username' => $this->mysql_username,
            'database.connections.mysql_secondary.password' => $this->mysql_password,
        ]);

        DB::purge('mysql_secondary');
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function hourlySales()
    {
        return $this->hasMany(HourlySale::class);
    }

    public function dailySales()
    {
        return $this->hasMany(DailySale::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function anomalyAlerts()
    {
        return $this->hasMany(AnomalyAlert::class);
    }
}
