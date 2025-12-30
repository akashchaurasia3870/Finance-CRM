<?php

namespace App\Http\Controllers;

use App\Services\LeadsService;

class LeadsController extends BaseController
{
    public function __construct(LeadsService $service)
    {
        parent::__construct($service);
    }
}