<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository extends BaseRepository
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function findActiveProducts()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findByProductType($type)
    {
        return $this->model->where('product_type', $type)->get();
    }

    public function findBySymbol($symbol)
    {
        return $this->model->where('symbol', $symbol)->first();
    }
}