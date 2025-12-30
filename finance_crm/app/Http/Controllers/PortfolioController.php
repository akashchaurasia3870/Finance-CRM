<?php

namespace App\Http\Controllers;

use App\Services\PortfolioService;

class PortfolioController extends BaseController
{
    public function __construct(PortfolioService $service)
    {
        parent::__construct($service);
    }
}