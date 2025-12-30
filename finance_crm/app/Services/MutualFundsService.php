<?php

namespace App\Services;

use App\Repositories\MutualFundsRepository;

class MutualFundsService extends BaseService
{
    public function __construct(MutualFundsRepository $repository)
    {
        parent::__construct($repository);
    }
}