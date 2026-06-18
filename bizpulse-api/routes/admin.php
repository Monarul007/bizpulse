<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\TenantConnectionController;
use App\Http\Controllers\Admin\TenantMappingController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', AdminDashboardController::class)->name('dashboard');

    Route::resource('tenants', TenantController::class)->except(['show']);
    Route::post('tenants/{tenant}/test-connection', [TenantConnectionController::class, 'test'])->name('tenants.test-connection');
    Route::post('tenants/{tenant}/auto-map', [TenantConnectionController::class, 'autoMap'])->name('tenants.auto-map');
    Route::put('tenants/{tenant}/mapping', [TenantMappingController::class, 'update'])->name('tenants.mapping.update');
});
