<?php

use App\Http\Controllers\Api\InventoryController;
use App\Http\Controllers\Api\SalesController;
use App\Http\Controllers\Api\AlertController;
use App\Http\Controllers\Api\CustomerController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('sales/ticker', [SalesController::class, 'ticker'])->name('api.sales.ticker');
    Route::get('sales/comparisons', [SalesController::class, 'comparisons'])->name('api.sales.comparisons');
    Route::get('sales/heatmap', [SalesController::class, 'heatmap'])->name('api.sales.heatmap');
    Route::get('sales/forecast', [SalesController::class, 'forecast'])->name('api.sales.forecast');
    Route::get('sales/top-products', [SalesController::class, 'topProducts'])->name('api.sales.top-products');
    Route::get('sales/promo-roi', [SalesController::class, 'promoRoi'])->name('api.sales.promo-roi');
    Route::get('sales/channels', [SalesController::class, 'channels'])->name('api.sales.channels');
    Route::get('sales/refunds', [SalesController::class, 'refunds'])->name('api.sales.refunds');

    Route::get('alerts', [AlertController::class, 'index'])->name('api.alerts.index');
    Route::post('alerts/{id}/dismiss', [AlertController::class, 'dismiss'])->name('api.alerts.dismiss');

    Route::get('inventory/dead-stock', [InventoryController::class, 'deadStock'])->name('api.inventory.dead-stock');
    Route::get('inventory/reorder-suggestions', [InventoryController::class, 'reorderSuggestions'])->name('api.inventory.reorder-suggestions');
    Route::get('inventory/margin-analysis', [InventoryController::class, 'marginAnalysis'])->name('api.inventory.margin-analysis');
    Route::get('inventory/seasonal-demand', [InventoryController::class, 'seasonalDemand'])->name('api.inventory.seasonal-demand');

    Route::get('customer/overview', [CustomerController::class, 'overview'])->name('api.customer.overview');
    Route::get('customer/rfm', [CustomerController::class, 'rfm'])->name('api.customer.rfm');
    Route::get('customer/churn', [CustomerController::class, 'churn'])->name('api.customer.churn');
    Route::get('customer/clv', [CustomerController::class, 'clv'])->name('api.customer.clv');
});
