<?php

namespace App\Repositories;

use App\Models\Payroll;

class PayrollRepository extends BaseRepository
{
    public function __construct(Payroll $model)
    {
        parent::__construct($model);
    }

    // You can add payroll-specific methods here that aren't in the interface
    public function findActivePayroll()
    {
        return $this->model->where('active', true)->get();
    }
}