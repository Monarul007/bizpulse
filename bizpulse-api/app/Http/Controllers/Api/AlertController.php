<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlertResource;
use App\Models\Tenant;
use App\Services\AlertService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlertController extends Controller
{
    public function __construct(
        private readonly AlertService $alertService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $type = $request->get('type');
        $severity = $request->get('severity');

        $alerts = $this->alertService->activeAlerts($tenant, $type, $severity);

        return response()->json([
            'data' => AlertResource::collection($alerts),
            'meta' => [
                'next_cursor' => $alerts->nextCursor()?->encode(),
                'previous_cursor' => $alerts->previousCursor()?->encode(),
                'unreviewed_count' => $this->alertService->unreviewedCount($tenant),
            ],
        ]);
    }

    public function dismiss(Request $request, int $id): JsonResponse
    {
        $tenant = $request->user()->tenant;
        $this->alertService->dismiss($id, $tenant);

        return response()->json(['message' => 'Alert dismissed']);
    }
}
