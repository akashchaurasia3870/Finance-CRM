<?php

namespace App\Repositories;

use App\Models\Complain;

class ComplainRepository extends BaseRepository
{
    public function __construct(Complain $model)
    {
        parent::__construct($model);
    }

    public function findByStatus($status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findByPriority($priority)
    {
        return $this->model->where('priority', $priority)->get();
    }

    public function findByClient($clientId)
    {
        return $this->model->where('client_id', $clientId)->get();
    }

    public function findAssignedTo($userId)
    {
        return $this->model->where('assigned_to', $userId)->get();
    }
}