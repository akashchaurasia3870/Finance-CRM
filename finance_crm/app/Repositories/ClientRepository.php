<?php

namespace App\Repositories;

use App\Models\Client;

class ClientRepository extends BaseRepository
{
    public function __construct(Client $model)
    {
        parent::__construct($model);
    }

    public function findActiveClients()
    {
        return $this->model->where('status', 'active')->get();
    }

    public function findByStatus(string $status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findByCompany(string $company)
    {
        return $this->model->where('company', 'like', '%' . $company . '%')->get();
    }
}