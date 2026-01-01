<?php

namespace App\Repositories;

use App\Models\Attendance;

class AttendanceRepository extends BaseRepository
{
    public function __construct(Attendance $model)
    {
        parent::__construct($model);
    }

    public function findActiveAttendance()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findByUser(int $userId)
    {
        return $this->model->where('user_id', $userId)->get();
    }

    public function findByDate(string $date)
    {
        return $this->model->where('attendance_date', $date)->get();
    }

    public function findByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }
}