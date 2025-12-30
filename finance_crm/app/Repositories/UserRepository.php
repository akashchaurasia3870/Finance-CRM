<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository extends BaseRepository
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    // You can add user-specific methods here that aren't in the interface
    public function findActiveUsers()
    {
        return $this->model->where('active', true)->get();
    }
}