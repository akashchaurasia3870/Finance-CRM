<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService extends BaseService
{
    public function __construct(ProductRepository $repository)
    {
        parent::__construct($repository);
    }

    public function getActiveProducts()
    {
        return $this->repository->findActiveProducts();
    }

    public function getProductsByType($type)
    {
        return $this->repository->findByProductType($type);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = auth()->id();
        return parent::createNewRecord($data);
    }
}