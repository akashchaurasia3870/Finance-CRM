<?php

namespace App\Repositories;

use App\Models\Portfolio;

class PortfolioRepository extends BaseRepository
{
    public function __construct(Portfolio $model)
    {
        parent::__construct($model);
    }

    public function findActivePortfolios()
    {
        return $this->model->where('status', 'active')
            ->with(['client', 'securityPositions.product'])
            ->get();
    }

    public function findByClient($clientId)
    {
        return $this->model->where('client_id', $clientId)
            ->with(['securityPositions.product'])
            ->get();
    }

    public function findByPortfolioNo($portfolioNo)
    {
        return $this->model->where('portfolio_no', $portfolioNo)
            ->with(['client', 'securityPositions.product'])
            ->first();
    }

    public function findWithPositions($id)
    {
        return $this->model->with([
            'client',
            'securityPositions.product',
            'transactions' => function($query) {
                $query->latest()->limit(10);
            }
        ])->find($id);
    }
}