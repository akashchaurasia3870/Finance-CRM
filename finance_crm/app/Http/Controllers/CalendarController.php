<?php

namespace App\Http\Controllers;

use App\Services\CalendarService;

class CalendarController extends BaseController
{
    public function __construct(CalendarService $service)
    {
        parent::__construct($service);
    }
}