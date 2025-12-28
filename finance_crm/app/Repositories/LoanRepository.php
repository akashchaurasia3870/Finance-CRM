<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository extends BaseRepository
{
    public function __construct(Loan $model)
    {
        parent::__construct($model);
    }

    // You can add loan-specific methods here that aren't in the interface
    public function findActiveLoan()
    {
        return $this->model->where('active', true)->get();
    }
}