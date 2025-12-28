<?php

namespace App\Repositories;

use App\Models\Stock;

class StockRepository extends BaseRepository
{
    public function __construct(Stock $model)
    {
        parent::__construct($model);
    }

    // You can add stock-specific methods here that aren't in the interface
    public function findActiveStock()
    {
        return $this->model->where('active', true)->get();
    }
}