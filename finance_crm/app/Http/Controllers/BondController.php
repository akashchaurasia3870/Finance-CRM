<?php

namespace App\Http\Controllers;

use App\Services\BondService;

class BondController extends BaseController
{
    public function __construct(BondService $service)
    {
        parent::__construct($service);
    }
}