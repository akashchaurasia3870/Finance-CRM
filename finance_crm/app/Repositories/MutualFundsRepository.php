<?php

namespace App\Repositories;

use App\Models\MutualFunds;

class MutualFundsRepository extends BaseRepository
{
    public function __construct(MutualFunds $model)
    {
        parent::__construct($model);
    }

    // You can add mutualfunds-specific methods here that aren't in the interface
    public function findActiveMutualFunds()
    {
        return $this->model->where('active', true)->get();
    }
}