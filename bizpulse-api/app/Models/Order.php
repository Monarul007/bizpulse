<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id', 'client_id', 'customer_id', 'ordered_at', 'total',
        'status', 'items_count', 'coupon_code', 'discount_amount', 'channel',
    ];

    protected function casts(): array
    {
        return [
            'ordered_at' => 'datetime',
            'total' => 'decimal:2',
            'discount_amount' => 'decimal:2',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
