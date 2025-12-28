<?php

namespace App\Repositories;

use App\Models\Reports;

class ReportsRepository extends BaseRepository
{
    public function __construct(Reports $model)
    {
        parent::__construct($model);
    }

    // You can add reports-specific methods here that aren't in the interface
    public function findActiveReports()
    {
        return $this->model->where('active', true)->get();
    }
}