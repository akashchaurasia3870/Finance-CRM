<?php

namespace App\Services;

use App\Repositories\LoanRepository;

class LoanService extends BaseService
{
    public function __construct(LoanRepository $repository)
    {
        parent::__construct($repository);
    }
}