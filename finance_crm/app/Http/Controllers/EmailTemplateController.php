<?php

namespace App\Http\Controllers;

use App\Services\EmailTemplateService;

class EmailTemplateController extends BaseController
{
    public function __construct(EmailTemplateService $service)
    {
        parent::__construct($service);
    }
}