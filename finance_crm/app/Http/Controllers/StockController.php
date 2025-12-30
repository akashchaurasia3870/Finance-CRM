<?php

namespace App\Http\Controllers;

use App\Services\StockService;

class StockController extends BaseController
{
    public function __construct(StockService $service)
    {
        parent::__construct($service);
    }
}