<?php

namespace App\Http\Controllers;

use App\Services\PayrollService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayrollWebController extends Controller
{
    protected $payrollService;
    protected $userService;

    public function __construct(PayrollService $payrollService, UserService $userService)
    {
        $this->payrollService = $payrollService;
        $this->userService = $userService;
    }

    public function index()
    {
        $payrolls = collect($this->payrollService->getAllRecords())->map(function ($payroll) {
            $payrollModel = $this->payrollService->getRecordById($payroll['id']);
            $payrollModel->load(['user', 'creator', 'approver']);
            return $payrollModel->toArray();
        });
        return Inertia::render('Modules/Payroll/View', ['payrolls' => $payrolls]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Payroll/New', ['users' => $users]);
    }

    public function store(Request $request)
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

        $this->payrollService->createNewRecord($request->all());
        return redirect('/payroll')->with('success', 'Payroll created successfully');
    }

    public function show($id)
    {
        $payroll = $this->payrollService->getRecordById($id);
        $payroll->load(['user', 'creator', 'approver', 'earnings', 'deductions']);
        return Inertia::render('Modules/Payroll/Detail', ['payroll' => $payroll]);
    }

    public function edit($id)
    {
        $payroll = $this->payrollService->getRecordById($id);
        $payroll->load(['earnings', 'deductions']);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Payroll/Edit', ['payroll' => $payroll, 'users' => $users]);
    }

    public function update(Request $request, $id)
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

        $this->payrollService->updateRecord($id, $request->all());
        return redirect('/payroll')->with('success', 'Payroll updated successfully');
    }

    public function destroy($id)
    {
        $this->payrollService->deleteRecord($id);
        return redirect('/payroll')->with('success', 'Payroll deleted successfully');
    }
}