<?php

namespace App\Http\Controllers;

use App\Services\SurveyService;

class SurveyController extends BaseController
{
    public function __construct(SurveyService $service)
    {
        parent::__construct($service);
    }
}