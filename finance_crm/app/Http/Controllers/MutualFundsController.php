<?php

namespace App\Http\Controllers;

use App\Services\MutualFundsService;

class MutualFundsController extends BaseController
{
    public function __construct(MutualFundsService $service)
    {
        parent::__construct($service);
    }
}