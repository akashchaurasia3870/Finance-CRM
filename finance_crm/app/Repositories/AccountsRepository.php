<?php

namespace App\Repositories;

use App\Models\Accounts;

class AccountsRepository extends BaseRepository
{
    public function __construct(Accounts $model)
    {
        parent::__construct($model);
    }

    public function findActiveAccounts()
    {
        return $this->model->where('status', 'active')->get();
    }

    public function findByAccountNo($accountNo)
    {
        return $this->model->where('account_no', $accountNo)->first();
    }

    public function findByClient($clientId)
    {
        return $this->model->where('client_id', $clientId)->get();
    }
}