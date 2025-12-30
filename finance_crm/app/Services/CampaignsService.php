<?php

namespace App\Services;

use App\Repositories\CampaignsRepository;

class CampaignsService extends BaseService
{
    public function __construct(CampaignsRepository $repository)
    {
        parent::__construct($repository);
    }
}