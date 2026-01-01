<?php

namespace App\Services;

use App\Repositories\RoleRepository;
use Illuminate\Support\Facades\Auth;

class RoleService extends BaseService
{
    public function __construct(RoleRepository $repository)
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
        $data['is_active'] = $data['is_active'] ?? true;
        
        // Handle permissions array
        if (isset($data['permissions']) && is_string($data['permissions'])) {
            $data['permissions'] = json_decode($data['permissions'], true) ?? [];
        }
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        // Handle permissions array
        if (isset($data['permissions']) && is_string($data['permissions'])) {
            $data['permissions'] = json_decode($data['permissions'], true) ?? [];
        }
        
        return $this->repository->edit($id, $data);
    }

    public function getActiveRoles()
    {
        return $this->repository->findActiveRoles();
    }

    public function findRoleByName(string $name)
    {
        return $this->repository->findByName($name);
    }
}