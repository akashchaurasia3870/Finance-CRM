<?php

namespace App\Repositories;

use App\Models\Target;

class TargetRepository extends BaseRepository
{
    public function __construct(Target $model)
    {
        parent::__construct($model);
    }

    // You can add target-specific methods here that aren't in the interface
    public function findActiveTarget()
    {
        return $this->model->where('active', true)->get();
    }
}