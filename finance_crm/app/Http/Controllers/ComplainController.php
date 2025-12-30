<?php

namespace App\Http\Controllers;

use App\Services\ComplainService;

class ComplainController extends BaseController
{
    public function __construct(ComplainService $service)
    {
        parent::__construct($service);
    }
}