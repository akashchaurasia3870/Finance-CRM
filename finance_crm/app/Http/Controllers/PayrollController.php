<?php

namespace App\Http\Controllers;

use App\Services\PayrollService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class PayrollController extends BaseController
{
    public function __construct(PayrollService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'pay_period' => 'required|string',
            'period_start' => 'required|date',
            'period_end' => 'required|date|after_or_equal:period_start',
            'pay_date' => 'required|date',
            'working_days' => 'required|integer|min:0',
            'present_days' => 'required|integer|min:0',
            'earnings' => 'required|array|min:1',
            'earnings.*.type' => 'required|string',
            'earnings.*.amount' => 'required|numeric|min:0',
            'deductions' => 'array',
            'deductions.*.type' => 'required|string',
            'deductions.*.amount' => 'required|numeric|min:0',
        ]);

        $payroll = $this->service->createNewRecord($request->all());
        return response()->json($payroll, 201);
    }

    public function getByUser($userId): JsonResponse
    {
        $payrolls = $this->service->getPayrollsByUser($userId);
        return response()->json($payrolls);
    }

    public function getByPeriod($period): JsonResponse
    {
        $payrolls = $this->service->getPayrollsByPeriod($period);
        return response()->json($payrolls);
    }

    public function getPendingApprovals(): JsonResponse
    {
        $payrolls = $this->service->getPendingApprovals();
        return response()->json($payrolls);
    }

    public function approve(Request $request, $id): JsonResponse
    {
        $updated = $this->service->approvePayroll($id, Auth::id());
        return response()->json(['success' => $updated]);
    }

    public function markPaid($id): JsonResponse
    {
        $updated = $this->service->markAsPaid($id);
        return response()->json(['success' => $updated]);
    }
}