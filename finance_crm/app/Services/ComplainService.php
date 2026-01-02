<?php

namespace App\Services;

use App\Repositories\ComplainRepository;
use Illuminate\Support\Facades\Auth;

class ComplainService extends BaseService
{
    public function __construct(ComplainRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        // Set created_by to current user if authenticated
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        // Set default values
        $data['status'] = $data['status'] ?? 'open';
        $data['priority'] = $data['priority'] ?? 'medium';
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        // If status is being changed to resolved, set resolved_at
        if (isset($data['status']) && $data['status'] === 'resolved' && !isset($data['resolved_at'])) {
            $data['resolved_at'] = now();
        }
        
        return (bool) $this->repository->edit($id, $data);
    }

    public function getComplainsByStatus($status)
    {
        return $this->repository->findByStatus($status);
    }

    public function getComplainsByPriority($priority)
    {
        return $this->repository->findByPriority($priority);
    }

    public function getComplainsByClient($clientId)
    {
        return $this->repository->findByClient($clientId);
    }

    public function getAssignedComplains($userId)
    {
        return $this->repository->findAssignedTo($userId);
    }
}