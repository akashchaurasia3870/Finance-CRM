<?php

namespace App\Services;

use App\Repositories\TasksRepository;

class TasksService extends BaseService
{
    public function __construct(TasksRepository $repository)
    {
        parent::__construct($repository);
    }
}