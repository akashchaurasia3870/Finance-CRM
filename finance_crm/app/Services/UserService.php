<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserService extends BaseService
{
    public function __construct(UserRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        
        // Set created_by to current user if authenticated
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        // Set default values
        $data['is_active'] = $data['is_active'] ?? true;
        
        // Extract roles before creating user
        $roles = $data['roles'] ?? [];
        unset($data['roles']);
        
        $user = $this->repository->add($data);
        
        // Attach roles if provided
        if (!empty($roles)) {
            $roleData = [];
            foreach ($roles as $roleId) {
                $roleData[$roleId] = [
                    'is_active' => true,
                    'created_by' => Auth::id(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            $user->roles()->attach($roleData);
        }
        
        return $user;
    }

    public function updateRecord(int $id, array $data): bool
    {
        // Hash password if provided and not empty
        if (isset($data['password']) && !empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            // Remove password from data if empty to avoid updating it
            unset($data['password']);
        }
        
        // Extract roles before updating user
        $roles = $data['roles'] ?? [];
        unset($data['roles']);
        
        $updated = $this->repository->edit($id, $data);
        
        // Update roles if provided
        if ($updated) {
            $user = $this->repository->find($id);
            if (!empty($roles)) {
                $roleData = [];
                foreach ($roles as $roleId) {
                    $roleData[$roleId] = [
                        'is_active' => true,
                        'created_by' => Auth::id(),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                $user->roles()->sync($roleData);
            } else {
                $user->roles()->detach();
            }
        }
        
        return (bool) $updated;
    }
}