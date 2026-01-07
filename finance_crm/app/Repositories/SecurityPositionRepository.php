<?php

namespace App\Repositories;

use App\Models\SecurityPosition;

class SecurityPositionRepository extends BaseRepository
{
    public function __construct(SecurityPosition $model)
    {
        parent::__construct($model);
    }

    public function findByPortfolio($portfolioId)
    {
        return $this->model->where('portfolio_id', $portfolioId)
            ->with('product')
            ->get();
    }

    public function findByProduct($productId)
    {
        return $this->model->where('product_id', $productId)->get();
    }

    public function findByPortfolioAndProduct($portfolioId, $productId)
    {
        return $this->model->where('portfolio_id', $portfolioId)
                          ->where('product_id', $productId)
                          ->first();
    }
}