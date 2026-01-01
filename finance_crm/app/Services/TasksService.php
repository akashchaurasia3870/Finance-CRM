<?php

namespace App\Services;

use App\Repositories\TasksRepository;
use Illuminate\Support\Facades\Auth;

class TasksService extends BaseService
{
    public function __construct(TasksRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['status'] = $data['status'] ?? 'pending';
        $data['priority'] = $data['priority'] ?? 'medium';
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        return $this->repository->edit($id, $data);
    }

    public function getTasksByAssignedTo(int $userId)
    {
        return $this->repository->findByAssignedTo($userId);
    }

    public function getTasksByStatus(string $status)
    {
        return $this->repository->findByStatus($status);
    }

    public function getTasksByPriority(string $priority)
    {
        return $this->repository->findByPriority($priority);
    }

    public function getOverdueTasks()
    {
        return $this->repository->findOverdueTasks();
    }

    public function getTasksByEntity(string $entityType, int $entityId)
    {
        return $this->repository->findByEntity($entityType, $entityId);
    }
}