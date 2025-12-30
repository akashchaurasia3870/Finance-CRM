<?php

namespace App\Http\Controllers;

use App\Services\CampaignsService;

class CampaignsController extends BaseController
{
    public function __construct(CampaignsService $service)
    {
        parent::__construct($service);
    }
}