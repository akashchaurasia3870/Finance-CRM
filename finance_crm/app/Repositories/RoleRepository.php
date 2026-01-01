<?php

namespace App\Repositories;

use App\Models\Role;

class RoleRepository extends BaseRepository
{
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    public function findActiveRoles()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findByName(string $name)
    {
        return $this->model->where('name', $name)->first();
    }
}