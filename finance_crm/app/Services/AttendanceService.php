<?php

namespace App\Services;

use App\Repositories\AttendanceRepository;
use Illuminate\Support\Facades\Auth;

class AttendanceService extends BaseService
{
    public function __construct(AttendanceRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['is_active'] = $data['is_active'] ?? true;
        $data['status'] = $data['status'] ?? 'absent';
        $data['source'] = $data['source'] ?? 'system';
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        if (!isset($data['is_active'])) {
            $data['is_active'] = true;
        }
        
        return $this->repository->edit($id, $data);
    }

    public function getActiveAttendance()
    {
        return $this->repository->findActiveAttendance();
    }

    public function getAttendanceByUser(int $userId)
    {
        return $this->repository->findByUser($userId);
    }

    public function getAttendanceByDate(string $date)
    {
        return $this->repository->findByDate($date);
    }

    public function getAttendanceByStatus(string $status)
    {
        return $this->repository->findByStatus($status);
    }
}