<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\InventoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function __construct(
        private readonly InventoryService $inventoryService
    ) {}

    public function deadStock(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $days = min(90, max(7, (int) ($request->get('days', 30))));
        $data = $this->inventoryService->deadStock($tenant, $days);

        return response()->json(['data' => $data]);
    }

    public function reorderSuggestions(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $data = $this->inventoryService->reorderSuggestions($tenant);

        return response()->json(['data' => $data]);
    }

    public function marginAnalysis(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $data = $this->inventoryService->marginAnalysis($tenant);

        return response()->json(['data' => $data]);
    }

    public function seasonalDemand(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $data = $this->inventoryService->seasonalDemand($tenant);

        return response()->json(['data' => $data]);
    }
}
