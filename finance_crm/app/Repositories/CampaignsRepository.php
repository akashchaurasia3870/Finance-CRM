<?php

namespace App\Repositories;

use App\Models\Campaigns;

class CampaignsRepository extends BaseRepository
{
    public function __construct(Campaigns $model)
    {
        parent::__construct($model);
    }

    // You can add campaigns-specific methods here that aren't in the interface
    public function findActiveCampaigns()
    {
        return $this->model->where('active', true)->get();
    }
}