<?php

namespace App\Repositories;

use App\Models\Attendance;

class AttendanceRepository extends BaseRepository
{
    public function __construct(Attendance $model)
    {
        parent::__construct($model);
    }

    // You can add attendance-specific methods here that aren't in the interface
    public function findActiveAttendance()
    {
        return $this->model->where('active', true)->get();
    }
}