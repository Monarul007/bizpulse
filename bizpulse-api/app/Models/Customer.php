<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id', 'client_id', 'name', 'email', 'phone',
        'total_revenue', 'total_orders', 'last_order_at', 'segment', 'churn_score',
    ];

    protected function casts(): array
    {
        return [
            'last_order_at' => 'datetime',
            'total_revenue' => 'decimal:2',
            'churn_score' => 'decimal:2',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}
