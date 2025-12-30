<?php

namespace App\Services;

use App\Repositories\BondRepository;

class BondService extends BaseService
{
    public function __construct(BondRepository $repository)
    {
        parent::__construct($repository);
    }
}