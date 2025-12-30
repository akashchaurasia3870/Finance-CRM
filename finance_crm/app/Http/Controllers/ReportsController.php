<?php

namespace App\Http\Controllers;

use App\Services\ReportsService;

class ReportsController extends BaseController
{
    public function __construct(ReportsService $service)
    {
        parent::__construct($service);
    }
}