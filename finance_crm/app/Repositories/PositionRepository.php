<?php

namespace App\Repositories;

use App\Models\Position;

class PositionRepository extends BaseRepository
{
    public function __construct(Position $model)
    {
        parent::__construct($model);
    }

    // You can add position-specific methods here that aren't in the interface
    public function findActivePosition()
    {
        return $this->model->where('active', true)->get();
    }
}