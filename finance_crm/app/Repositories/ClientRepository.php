<?php

namespace App\Repositories;

use App\Models\Client;

class ClientRepository extends BaseRepository
{
    public function __construct(Client $model)
    {
        parent::__construct($model);
    }

    // You can add client-specific methods here that aren't in the interface
    public function findActiveClient()
    {
        return $this->model->where('active', true)->get();
    }
}