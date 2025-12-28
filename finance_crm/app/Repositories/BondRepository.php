<?php

namespace App\Repositories;

use App\Models\Bond;

class BondRepository extends BaseRepository
{
    public function __construct(Bond $model)
    {
        parent::__construct($model);
    }

    // You can add bond-specific methods here that aren't in the interface
    public function findActiveBond()
    {
        return $this->model->where('active', true)->get();
    }
}