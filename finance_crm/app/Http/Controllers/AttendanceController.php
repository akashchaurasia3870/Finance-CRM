<?php

namespace App\Http\Controllers;

use App\Services\AttendanceService;

class AttendanceController extends BaseController
{
    public function __construct(AttendanceService $service)
    {
        parent::__construct($service);
    }
}