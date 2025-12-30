<?php

namespace App\Http\Controllers;

use App\Services\PositionService;

class PositionController extends BaseController
{
    public function __construct(PositionService $service)
    {
        parent::__construct($service);
    }
}