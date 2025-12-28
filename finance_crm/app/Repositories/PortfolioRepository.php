<?php

namespace App\Repositories;

use App\Models\Portfolio;

class PortfolioRepository extends BaseRepository
{
    public function __construct(Portfolio $model)
    {
        parent::__construct($model);
    }

    // You can add portfolio-specific methods here that aren't in the interface
    public function findActivePortfolio()
    {
        return $this->model->where('active', true)->get();
    }
}