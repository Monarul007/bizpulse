<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailySale extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id', 'date', 'revenue', 'orders_count', 'items_count',
        'avg_order_value', 'total_discount',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'revenue' => 'decimal:2',
            'avg_order_value' => 'decimal:2',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}
