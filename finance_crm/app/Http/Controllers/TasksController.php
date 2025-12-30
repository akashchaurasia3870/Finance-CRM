<?php

namespace App\Http\Controllers;

use App\Services\TasksService;

class TasksController extends BaseController
{
    public function __construct(TasksService $service)
    {
        parent::__construct($service);
    }
}