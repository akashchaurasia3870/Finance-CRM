<?php

namespace App\Services;

use App\Repositories\ClientRepository;
use Illuminate\Support\Facades\Auth;

class ClientService extends BaseService
{
    public function __construct(ClientRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['status'] = $data['status'] ?? 'active';
        
        return $this->repository->add($data);
    }

    public function getActiveClients()
    {
        return $this->repository->findActiveClients();
    }

    public function getClientsByStatus(string $status)
    {
        return $this->repository->findByStatus($status);
    }

    public function getClientsByCompany(string $company)
    {
        return $this->repository->findByCompany($company);
    }

    public function updateRecord(int $id, array $data): bool
    {
        // Set default status if not provided
        if (!isset($data['status'])) {
            $data['status'] = 'active';
        }
        
        return $this->repository->edit($id, $data);
    }
}