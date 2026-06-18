<?php

namespace App\Sync;

use App\Models\Tenant;

class SyncConfig
{
    private Tenant $tenant;
    private array $config;

    public function __construct(Tenant $tenant)
    {
        $this->tenant = $tenant;
        $this->config = $tenant->sync_config ?? [];
    }

    public static function for(Tenant $tenant): static
    {
        return new static($tenant);
    }

    public function table(string $canonical): ?string
    {
        return $this->config['tables'][$canonical]['real_name'] ?? $canonical;
    }

    public function column(string $canonicalTable, string $canonicalColumn): ?string
    {
        return $this->config['tables'][$canonicalTable]['columns'][$canonicalColumn] ?? $canonicalColumn;
    }

    public function allTables(): array
    {
        return $this->config['tables'] ?? [];
    }

    public function hasMapping(): bool
    {
        return !empty($this->config['tables']);
    }

    public function toSelect(string $canonicalTable, array $columns): array
    {
        $select = [];
        foreach ($columns as $col) {
            $mapped = $this->column($canonicalTable, $col);
            $select[] = $mapped ? "$mapped as $col" : "$col";
        }
        return $select;
    }

    public function getTenant(): Tenant
    {
        return $this->tenant;
    }
}
