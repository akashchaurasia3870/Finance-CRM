<?php

namespace App\Repositories;

use App\Models\Complain;

class ComplainRepository extends BaseRepository
{
    public function __construct(Complain $model)
    {
        parent::__construct($model);
    }

    // You can add complain-specific methods here that aren't in the interface
    public function findActiveComplain()
    {
        return $this->model->where('active', true)->get();
    }
}