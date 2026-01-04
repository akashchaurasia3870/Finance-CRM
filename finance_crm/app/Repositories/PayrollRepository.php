<?php

namespace App\Repositories;

use App\Models\Payroll;

class PayrollRepository extends BaseRepository
{
    public function __construct(Payroll $model)
    {
        parent::__construct($model);
    }

    public function findByUser($userId)
    {
        return $this->model->where('user_id', $userId)
                          ->with(['user', 'payrollCycle', 'earnings', 'deductions'])
                          ->orderBy('pay_date', 'desc')
                          ->get();
    }

    public function findByPeriod($period)
    {
        return $this->model->where('pay_period', $period)
                          ->with(['user', 'earnings', 'deductions'])
                          ->get();
    }

    public function findPendingApproval()
    {
        return $this->model->where('status', 'generated')
                          ->with(['user', 'creator'])
                          ->get();
    }
}