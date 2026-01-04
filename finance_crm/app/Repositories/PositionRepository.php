<?php

namespace App\Repositories;

use App\Models\Position;

class PositionRepository extends BaseRepository
{
    public function __construct(Position $model)
    {
        parent::__construct($model);
    }

    public function findByPortfolio($portfolioId)
    {
        return $this->model->where('portfolio_id', $portfolioId)
            ->with('product')
            ->get();
    }

    public function findByPortfolioAndType($portfolioId, $type)
    {
        return $this->model->where('portfolio_id', $portfolioId)
            ->where('position_type', $type)
            ->with('product')
            ->get();
    }

    public function findByPortfolioAndProduct($portfolioId, $productId, $type)
    {
        return $this->model->where('portfolio_id', $portfolioId)
            ->where('product_id', $productId)
            ->where('position_type', $type)
            ->first();
    }

    public function getActivePositions()
    {
        return $this->model->where('quantity', '>', 0)
            ->with(['portfolio', 'product'])
            ->get();
    }
}