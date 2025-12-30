<?php

namespace App\Http\Controllers;

use App\Services\PayrollService;

class PayrollController extends BaseController
{
    public function __construct(PayrollService $service)
    {
        parent::__construct($service);
    }
}