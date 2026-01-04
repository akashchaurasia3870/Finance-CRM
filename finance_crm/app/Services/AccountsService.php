<?php

namespace App\Services;

use App\Repositories\AccountsRepository;

class AccountsService extends BaseService
{
    public function __construct(AccountsRepository $repository)
    {
        parent::__construct($repository);
    }

    public function getActiveAccounts()
    {
        return $this->repository->findActiveAccounts();
    }

    public function getAccountsByClient($clientId)
    {
        return $this->repository->findByClient($clientId);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = auth()->id();
        if (!isset($data['account_no'])) {
            $data['account_no'] = $this->generateAccountNumber();
        }
        return parent::createNewRecord($data);
    }

    private function generateAccountNumber()
    {
        return str_pad(rand(100000000, 999999999), 9, '0', STR_PAD_LEFT);
    }
}