<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CustomerIntelligenceService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function __construct(
        private readonly CustomerIntelligenceService $customerService
    ) {}

    public function overview(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        return response()->json(['data' => $this->customerService->overview($tenant)]);
    }

    public function rfm(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        return response()->json(['data' => $this->customerService->rfmSegmentation($tenant)]);
    }

    public function churn(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        return response()->json(['data' => $this->customerService->churnAnalysis($tenant)]);
    }

    public function clv(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        return response()->json(['data' => $this->customerService->clvAnalysis($tenant)]);
    }
}
