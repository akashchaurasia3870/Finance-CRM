<?php

namespace App\Http\Controllers;

use App\Services\AccountsService;

class AccountsController extends BaseController
{
    public function __construct(AccountsService $service)
    {
        parent::__construct($service);
    }
}