<?php

namespace App\Http\Controllers;

use App\Services\ClientService;

class ClientController extends BaseController
{
    public function __construct(ClientService $service)
    {
        parent::__construct($service);
    }
}