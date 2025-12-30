<?php

namespace App\Http\Controllers;

use App\Services\TargetService;

class TargetController extends BaseController
{
    public function __construct(TargetService $service)
    {
        parent::__construct($service);
    }
}