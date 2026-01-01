<?php

namespace App\Repositories;

use App\Models\Tasks;

class TasksRepository extends BaseRepository
{
    public function __construct(Tasks $model)
    {
        parent::__construct($model);
    }

    public function findByAssignedTo(int $userId)
    {
        return $this->model->where('assigned_to', $userId)->get();
    }

    public function findByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findByPriority(string $priority)
    {
        return $this->model->where('priority', $priority)->get();
    }

    public function findOverdueTasks()
    {
        return $this->model->where('due_date', '<', now()->toDateString())
                          ->whereIn('status', ['pending', 'in_progress'])
                          ->get();
    }

    public function findByEntity(string $entityType, int $entityId)
    {
        return $this->model->where('entity_type', $entityType)
                          ->where('entity_id', $entityId)
                          ->get();
    }
}