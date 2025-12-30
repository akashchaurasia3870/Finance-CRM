<?php

namespace App\Services;

use App\Repositories\HomeRepository;

class HomeService extends BaseService
{
    public function __construct(HomeRepository $repository)
    {
        parent::__construct($repository);
    }
}