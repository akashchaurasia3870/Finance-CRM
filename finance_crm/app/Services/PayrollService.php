<?php

namespace App\Services;

use App\Repositories\PayrollRepository;
use App\Models\PayrollEarning;
use App\Models\PayrollDeduction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PayrollService extends BaseService
{
    public function __construct(PayrollRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        return DB::transaction(function () use ($data) {
            $data['created_by'] = Auth::id();
            $data['generated_at'] = now();
            
            // Set payroll_cycle_id to null if not provided
            if (!isset($data['payroll_cycle_id'])) {
                $data['payroll_cycle_id'] = null;
            }
            
            // Calculate totals from earnings and deductions arrays
            $totalEarnings = 0;
            $totalDeductions = 0;
            
            if (isset($data['earnings'])) {
                $totalEarnings = collect($data['earnings'])->sum('amount');
            }
            
            if (isset($data['deductions'])) {
                $totalDeductions = collect($data['deductions'])->sum('amount');
            }
            
            $data['total_earnings'] = $totalEarnings;
            $data['total_deductions'] = $totalDeductions;
            $data['gross_salary'] = $totalEarnings;
            $data['net_salary'] = $totalEarnings - $totalDeductions;
            
            $payroll = $this->repository->add($data);
            
            // Create earnings
            if (isset($data['earnings'])) {
                foreach ($data['earnings'] as $earning) {
                    if (!empty($earning['type']) && !empty($earning['amount'])) {
                        PayrollEarning::create([
                            'payroll_id' => $payroll->id,
                            'type' => $earning['type'],
                            'amount' => $earning['amount'],
                            'created_by' => Auth::id(),
                        ]);
                    }
                }
            }
            
            // Create deductions
            if (isset($data['deductions'])) {
                foreach ($data['deductions'] as $deduction) {
                    if (!empty($deduction['type']) && !empty($deduction['amount'])) {
                        PayrollDeduction::create([
                            'payroll_id' => $payroll->id,
                            'type' => $deduction['type'],
                            'amount' => $deduction['amount'],
                            'created_by' => Auth::id(),
                        ]);
                    }
                }
            }
            
            return $payroll;
        });
    }

    public function updateRecord(int $id, array $data): bool
    {
        return DB::transaction(function () use ($id, $data) {
            // Calculate totals from earnings and deductions arrays
            $totalEarnings = 0;
            $totalDeductions = 0;
            
            if (isset($data['earnings'])) {
                $totalEarnings = collect($data['earnings'])->sum('amount');
            }
            
            if (isset($data['deductions'])) {
                $totalDeductions = collect($data['deductions'])->sum('amount');
            }
            
            $data['total_earnings'] = $totalEarnings;
            $data['total_deductions'] = $totalDeductions;
            $data['gross_salary'] = $totalEarnings;
            $data['net_salary'] = $totalEarnings - $totalDeductions;
            
            $updated = $this->repository->edit($id, $data);
            
            // Delete existing earnings and deductions
            PayrollEarning::where('payroll_id', $id)->delete();
            PayrollDeduction::where('payroll_id', $id)->delete();
            
            // Create new earnings
            if (isset($data['earnings'])) {
                foreach ($data['earnings'] as $earning) {
                    if (!empty($earning['type']) && !empty($earning['amount'])) {
                        PayrollEarning::create([
                            'payroll_id' => $id,
                            'type' => $earning['type'],
                            'amount' => $earning['amount'],
                            'created_by' => Auth::id(),
                        ]);
                    }
                }
            }
            
            // Create new deductions
            if (isset($data['deductions'])) {
                foreach ($data['deductions'] as $deduction) {
                    if (!empty($deduction['type']) && !empty($deduction['amount'])) {
                        PayrollDeduction::create([
                            'payroll_id' => $id,
                            'type' => $deduction['type'],
                            'amount' => $deduction['amount'],
                            'created_by' => Auth::id(),
                        ]);
                    }
                }
            }
            
            return $updated;
        });
    }

    public function getPayrollsByUser($userId)
    {
        return $this->repository->findByUser($userId);
    }

    public function getPayrollsByPeriod($period)
    {
        return $this->repository->findByPeriod($period);
    }

    public function getPendingApprovals()
    {
        return $this->repository->findPendingApproval();
    }

    public function approvePayroll($id, $approverId)
    {
        return $this->repository->edit($id, [
            'status' => 'approved',
            'approved_by' => $approverId,
            'approved_at' => now(),
        ]);
    }

    public function markAsPaid($id)
    {
        return $this->repository->edit($id, [
            'status' => 'paid',
            'paid_at' => now(),
        ]);
    }
}