<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTenantRequest;
use App\Http\Requests\Admin\UpdateTenantRequest;
use App\Models\Tenant;
use App\Services\TenantService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TenantController extends Controller
{
    public function __construct(
        private readonly TenantService $tenantService
    ) {}

    public function index(): Response
    {
        $tenants = $this->tenantService->allTenantsWithStatus();

        return Inertia::render('admin/tenants/index', [
            'tenants' => $tenants,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/tenants/create');
    }

    public function store(StoreTenantRequest $request): RedirectResponse
    {
        $tenant = Tenant::create($request->validated());

        return to_route('admin.tenants.edit', $tenant)
            ->with('success', 'Tenant created successfully');
    }

    public function edit(Tenant $tenant): Response
    {
        return Inertia::render('admin/tenants/edit', [
            'tenant' => $tenant,
            'canonicalSchema' => config('sync.tables'),
        ]);
    }

    public function update(UpdateTenantRequest $request, Tenant $tenant): RedirectResponse
    {
        $tenant->update($request->validated());

        return to_route('admin.tenants.edit', $tenant)
            ->with('success', 'Tenant updated successfully');
    }

    public function destroy(Tenant $tenant): RedirectResponse
    {
        $tenant->delete();

        return to_route('admin.tenants.index')
            ->with('success', 'Tenant deleted successfully');
    }
}
