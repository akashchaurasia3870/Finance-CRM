<?php

namespace App\Repositories;

use App\Models\Target;

class TargetRepository extends BaseRepository
{
    public function __construct(Target $model)
    {
        parent::__construct($model);
    }

    public function findByAssignedTo(int $userId)
    {
        return $this->model->where('assigned_to', $userId)->get();
    }

    public function findActiveTargets()
    {
        return $this->model->where('end_date', '>=', now()->toDateString())->get();
    }

    public function findExpiredTargets()
    {
        return $this->model->where('end_date', '<', now()->toDateString())->get();
    }

    public function findByDateRange(string $startDate, string $endDate)
    {
        return $this->model->whereBetween('start_date', [$startDate, $endDate])
                          ->orWhereBetween('end_date', [$startDate, $endDate])
                          ->get();
    }
}