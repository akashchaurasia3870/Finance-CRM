<?php

namespace App\Http\Controllers;

use App\Services\ForexService;

class ForexController extends BaseController
{
    public function __construct(ForexService $service)
    {
        parent::__construct($service);
    }
}