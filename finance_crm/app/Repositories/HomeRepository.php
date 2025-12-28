<?php

namespace App\Repositories;

use App\Models\Home;

class HomeRepository extends BaseRepository
{
    public function __construct(Home $model)
    {
        parent::__construct($model);
    }

    // You can add home-specific methods here that aren't in the interface
    public function findActiveHome()
    {
        return $this->model->where('active', true)->get();
    }
}