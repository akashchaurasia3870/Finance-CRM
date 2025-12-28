<?php

namespace App\Repositories;

use App\Models\Forex;

class ForexRepository extends BaseRepository
{
    public function __construct(Forex $model)
    {
        parent::__construct($model);
    }

    // You can add forex-specific methods here that aren't in the interface
    public function findActiveForex()
    {
        return $this->model->where('active', true)->get();
    }
}