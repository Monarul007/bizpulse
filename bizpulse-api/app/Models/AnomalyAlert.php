<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class AnomalyAlert extends Model
{
    use HasFactory;

    protected $fillable = [
        'tenant_id', 'type', 'severity', 'message', 'meta', 'dismissed_at',
    ];

    protected function casts(): array
    {
        return [
            'meta' => 'array',
            'dismissed_at' => 'datetime',
        ];
    }

    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public function scopeActive(Builder $query): void
    {
        $query->whereNull('dismissed_at');
    }

    public function scopeByType(Builder $query, string $type): void
    {
        $query->where('type', $type);
    }

    public function scopeBySeverity(Builder $query, string $severity): void
    {
        $query->where('severity', $severity);
    }
}
