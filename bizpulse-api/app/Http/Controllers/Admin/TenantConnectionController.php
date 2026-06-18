<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use App\Services\TenantService;
use Illuminate\Http\JsonResponse;

class TenantConnectionController extends Controller
{
    public function __construct(
        private readonly TenantService $tenantService
    ) {}

    public function test(Tenant $tenant): JsonResponse
    {
        $result = $this->tenantService->testConnection($tenant);

        return response()->json($result);
    }

    public function autoMap(Tenant $tenant): JsonResponse
    {
        try {
            $result = $this->tenantService->autoMapColumns($tenant);
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Auto-map failed: ' . $e->getMessage(),
                'tables' => [],
            ], 500);
        }
    }
}
