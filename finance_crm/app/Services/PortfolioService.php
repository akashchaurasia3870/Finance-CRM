<?php

namespace App\Services;

use App\Repositories\PortfolioRepository;

class PortfolioService extends BaseService
{
    public function __construct(PortfolioRepository $repository)
    {
        parent::__construct($repository);
    }
}