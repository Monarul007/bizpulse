<?php

namespace App\Services;

use App\Models\Tenant;
use App\Sync\SyncConfig;
use App\Actions\AutoMapSchema;
use Illuminate\Support\Facades\DB;

class TenantService
{
    public function testConnection(Tenant $tenant): array
    {
        $tenant->configureSecondaryConnection();

        try {
            DB::connection('mysql_secondary')->getPdo();
            $tables = DB::connection('mysql_secondary')
                ->select('SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ?', [
                    $tenant->mysql_database,
                ]);

            return [
                'success' => true,
                'tables_count' => (int)$tables[0]->count,
                'message' => 'Connected successfully',
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Connection failed: ' . $e->getMessage(),
            ];
        }
    }

    public function autoMapColumns(Tenant $tenant): array
    {
        $mapper = new AutoMapSchema;
        return $mapper->map($tenant);
    }

    public function saveMapping(Tenant $tenant, array $mapping): void
    {
        $tenant->update(['sync_config' => $mapping]);
    }

    public function getSyncConfig(Tenant $tenant): SyncConfig
    {
        return SyncConfig::for($tenant);
    }

    public function allTenantsWithStatus()
    {
        return Tenant::select([
            'id', 'name', 'slug', 'mysql_host', 'mysql_database',
            'is_active', 'sync_config', 'created_at',
        ])->orderBy('name')->paginate(20);
    }
}
