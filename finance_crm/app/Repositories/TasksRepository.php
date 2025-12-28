<?php

namespace App\Repositories;

use App\Models\Tasks;

class TasksRepository extends BaseRepository
{
    public function __construct(Tasks $model)
    {
        parent::__construct($model);
    }

    // You can add tasks-specific methods here that aren't in the interface
    public function findActiveTasks()
    {
        return $this->model->where('active', true)->get();
    }
}