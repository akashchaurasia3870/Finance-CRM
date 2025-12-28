<?php

namespace App\Repositories;

use App\Models\Accounts;

class AccountsRepository extends BaseRepository
{
    public function __construct(Accounts $model)
    {
        parent::__construct($model);
    }

    // You can add accounts-specific methods here that aren't in the interface
    public function findActiveAccounts()
    {
        return $this->model->where('active', true)->get();
    }
}