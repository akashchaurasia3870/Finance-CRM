<?php

namespace App\Http\Controllers;

use App\Services\MeetingsService;

class MeetingsController extends BaseController
{
    public function __construct(MeetingsService $service)
    {
        parent::__construct($service);
    }
}