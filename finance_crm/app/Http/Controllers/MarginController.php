<?php

namespace App\Http\Controllers;

use App\Services\MarginService;

class MarginController extends BaseController
{
    public function __construct(MarginService $service)
    {
        parent::__construct($service);
    }
}