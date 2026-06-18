<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\AdminDashboardService;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __construct(
        private readonly AdminDashboardService $dashboardService
    ) {}

    public function __invoke(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => $this->dashboardService->stats(),
            'recentActivity' => $this->dashboardService->recentActivity(),
        ]);
    }
}
