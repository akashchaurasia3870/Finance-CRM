<?php

namespace App\Http\Controllers;

use App\Services\HomeService;

class HomeController extends BaseController
{
    public function __construct(HomeService $service)
    {
        parent::__construct($service);
    }
}