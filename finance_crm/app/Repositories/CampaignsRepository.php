<?php

namespace App\Repositories;

use App\Models\Campaigns;

class CampaignsRepository extends BaseRepository
{
    public function __construct(Campaigns $model)
    {
        parent::__construct($model);
    }

    public function findByStatus($status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findByType($type)
    {
        return $this->model->where('type', $type)->get();
    }

    public function findActiveCampaigns()
    {
        return $this->model->where('status', 'active')->get();
    }

    public function findByDateRange($startDate, $endDate)
    {
        return $this->model->whereBetween('start_date', [$startDate, $endDate])->get();
    }
}