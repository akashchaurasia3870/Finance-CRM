<?php

namespace App\Services;

use App\Repositories\AccountsRepository;

class AccountsService extends BaseService
{
    public function __construct(AccountsRepository $repository)
    {
        parent::__construct($repository);
    }
}