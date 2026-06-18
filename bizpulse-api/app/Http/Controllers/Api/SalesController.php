<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SalesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    public function __construct(
        private readonly SalesService $salesService
    ) {}

    public function ticker(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $data = $this->salesService->ticker($tenant);

        return response()->json(['data' => $data]);
    }

    public function comparisons(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $period = $request->get('period', '7d');
        $data = $this->salesService->comparisons($tenant, $period);

        return response()->json(['data' => $data]);
    }

    public function heatmap(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $days = min(90, max(1, (int)($request->get('days', 30))));
        $data = $this->salesService->heatmap($tenant, $days);

        return response()->json(['data' => $data]);
    }

    public function forecast(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $data = $this->salesService->forecast($tenant);

        return response()->json(['data' => $data]);
    }

    public function topProducts(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $limit = min(50, max(1, (int)($request->get('limit', 10))));
        $data = $this->salesService->topProducts($tenant, $limit);

        return response()->json(['data' => $data]);
    }

    public function promoRoi(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $validated = $request->validate([
            'from' => 'required|date',
            'to' => 'required|date|after_or_equal:from',
        ]);
        $data = $this->salesService->promoRoi($tenant, $validated['from'], $validated['to']);

        return response()->json(['data' => $data]);
    }

    public function channels(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $from = $request->get('from', now()->subMonth()->toDateString());
        $to = $request->get('to', now()->toDateString());
        $data = $this->salesService->channels($tenant, $from, $to);

        return response()->json(['data' => $data]);
    }

    public function refunds(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $from = $request->get('from', now()->subMonth()->toDateString());
        $to = $request->get('to', now()->toDateString());
        $data = $this->salesService->refunds($tenant, $from, $to);

        return response()->json(['data' => $data]);
    }
}
