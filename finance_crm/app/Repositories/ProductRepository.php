<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository extends BaseRepository
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    // You can add product-specific methods here that aren't in the interface
    public function findActiveProduct()
    {
        return $this->model->where('active', true)->get();
    }
}