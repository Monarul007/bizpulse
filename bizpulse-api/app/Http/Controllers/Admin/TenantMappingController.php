<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateTenantMappingRequest;
use App\Models\Tenant;
use App\Services\TenantService;
use Illuminate\Http\RedirectResponse;

class TenantMappingController extends Controller
{
    public function __construct(
        private readonly TenantService $tenantService
    ) {}

    public function update(UpdateTenantMappingRequest $request, Tenant $tenant): RedirectResponse
    {
        $this->tenantService->saveMapping($tenant, $request->validated('sync_config'));

        return to_route('admin.tenants.edit', $tenant)
            ->with('success', 'Column mapping saved successfully');
    }
}
