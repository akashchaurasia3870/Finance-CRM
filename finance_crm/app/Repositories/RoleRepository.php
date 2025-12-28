<?php

namespace App\Repositories;

use App\Models\Role;

class RoleRepository extends BaseRepository
{
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    // You can add role-specific methods here that aren't in the interface
    public function findActiveRole()
    {
        return $this->model->where('active', true)->get();
    }
}