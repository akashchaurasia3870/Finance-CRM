<?php

namespace App\Repositories;

use App\Models\Leads;

class LeadsRepository extends BaseRepository
{
    public function __construct(Leads $model)
    {
        parent::__construct($model);
    }

    public function findByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findByAssignedTo(int $userId)
    {
        return $this->model->where('assigned_to', $userId)->get();
    }

    public function findBySource(string $source)
    {
        return $this->model->where('source', $source)->get();
    }

    public function findUpcomingFollowUps()
    {
        return $this->model->whereNotNull('follow_up_date')
                          ->where('follow_up_date', '>=', now()->toDateString())
                          ->orderBy('follow_up_date')
                          ->get();
    }
}