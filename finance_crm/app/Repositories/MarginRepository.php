<?php

namespace App\Repositories;

use App\Models\Margin;

class MarginRepository extends BaseRepository
{
    public function __construct(Margin $model)
    {
        parent::__construct($model);
    }

    // You can add margin-specific methods here that aren't in the interface
    public function findActiveMargin()
    {
        return $this->model->where('active', true)->get();
    }
}