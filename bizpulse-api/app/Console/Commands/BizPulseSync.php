<?php

namespace App\Console\Commands;

use App\Models\Tenant;
use App\Services\SyncService;
use Illuminate\Console\Command;

class BizPulseSync extends Command
{
    protected $signature = 'bizpulse:sync {type : hourly_sales|daily_sales|products|customers|anomaly_detection} {--tenant= : Specific tenant ID}';
    protected $description = 'Run BizPulse sync for one or all tenants';

    public function handle(SyncService $syncService): int
    {
        $type = $this->argument('type');
        $tenantId = $this->option('tenant');

        $query = Tenant::where('is_active', true)->whereNotNull('sync_config');

        if ($tenantId) {
            $query->where('id', $tenantId);
        }

        $count = 0;
        $query->each(function (Tenant $tenant) use ($syncService, $type, &$count) {
            try {
                $syncService->runForTenant($tenant, $type);
                $this->info("Synced tenant {$tenant->id} ({$tenant->name}): {$type}");
                $count++;
            } catch (\Exception $e) {
                $this->error("Failed tenant {$tenant->id}: {$e->getMessage()}");
            }
        });

        $this->info("Done. Processed {$count} tenants.");

        return Command::SUCCESS;
    }
}
