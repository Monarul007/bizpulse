<?php

namespace App\Services;

use App\Models\AnomalyAlert;
use App\Models\Tenant;

class AlertService
{
    public function activeAlerts(Tenant $tenant, ?string $type = null, ?string $severity = null, int $perPage = 20)
    {
        $query = AnomalyAlert::where('tenant_id', $tenant->id)->active();

        if ($type) {
            $query->byType($type);
        }
        if ($severity) {
            $query->bySeverity($severity);
        }

        return $query->orderByDesc('created_at')->cursorPaginate($perPage);
    }

    public function dismiss(int $alertId, Tenant $tenant): void
    {
        AnomalyAlert::where('id', $alertId)
            ->where('tenant_id', $tenant->id)
            ->update(['dismissed_at' => now()]);
    }

    public function createAlert(Tenant $tenant, string $type, string $severity, string $message, ?array $meta = null): AnomalyAlert
    {
        return AnomalyAlert::create([
            'tenant_id' => $tenant->id,
            'type' => $type,
            'severity' => $severity,
            'message' => $message,
            'meta' => $meta,
        ]);
    }

    public function unreviewedCount(Tenant $tenant): int
    {
        return AnomalyAlert::where('tenant_id', $tenant->id)
            ->active()
            ->count();
    }
}
