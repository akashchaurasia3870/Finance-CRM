<?php

namespace App\Services;

use App\Repositories\LeadsRepository;
use Illuminate\Support\Facades\Auth;

class LeadsService extends BaseService
{
    public function __construct(LeadsRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['status'] = $data['status'] ?? 'new';
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        if (!isset($data['status'])) {
            $data['status'] = 'new';
        }
        
        return $this->repository->edit($id, $data);
    }

    public function getLeadsByStatus(string $status)
    {
        return $this->repository->findByStatus($status);
    }

    public function getLeadsByAssignedTo(int $userId)
    {
        return $this->repository->findByAssignedTo($userId);
    }

    public function getLeadsBySource(string $source)
    {
        return $this->repository->findBySource($source);
    }

    public function getUpcomingFollowUps()
    {
        return $this->repository->findUpcomingFollowUps();
    }
}