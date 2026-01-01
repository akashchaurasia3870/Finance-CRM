<?php

namespace App\Services;

use App\Repositories\TargetRepository;
use Illuminate\Support\Facades\Auth;

class TargetService extends BaseService
{
    public function __construct(TargetRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['achieved_value'] = $data['achieved_value'] ?? 0;
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        return $this->repository->edit($id, $data);
    }

    public function getTargetsByAssignedTo(int $userId)
    {
        return $this->repository->findByAssignedTo($userId);
    }

    public function getActiveTargets()
    {
        return $this->repository->findActiveTargets();
    }

    public function getExpiredTargets()
    {
        return $this->repository->findExpiredTargets();
    }

    public function getTargetsByDateRange(string $startDate, string $endDate)
    {
        return $this->repository->findByDateRange($startDate, $endDate);
    }
}