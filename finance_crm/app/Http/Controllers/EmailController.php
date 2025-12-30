<?php

namespace App\Http\Controllers;

use App\Services\EmailService;

class EmailController extends BaseController
{
    public function __construct(EmailService $service)
    {
        parent::__construct($service);
    }
}