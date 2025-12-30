<?php

namespace App\Services;

use App\Repositories\StockRepository;

class StockService extends BaseService
{
    public function __construct(StockRepository $repository)
    {
        parent::__construct($repository);
    }
}