<?php

namespace App\Repositories;

use App\Models\Leads;

class LeadsRepository extends BaseRepository
{
    public function __construct(Leads $model)
    {
        parent::__construct($model);
    }

    // You can add leads-specific methods here that aren't in the interface
    public function findActiveLeads()
    {
        return $this->model->where('active', true)->get();
    }
}