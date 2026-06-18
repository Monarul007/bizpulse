<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HourlySale extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id', 'date', 'hour', 'revenue', 'orders_count', 'items_count',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'revenue' => 'decimal:2',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }
}
