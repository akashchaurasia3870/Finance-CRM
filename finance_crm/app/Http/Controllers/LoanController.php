<?php

namespace App\Http\Controllers;

use App\Services\LoanService;

class LoanController extends BaseController
{
    public function __construct(LoanService $service)
    {
        parent::__construct($service);
    }
}