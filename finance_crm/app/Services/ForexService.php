<?php

namespace App\Services;

use App\Repositories\ForexRepository;

class ForexService extends BaseService
{
    public function __construct(ForexRepository $repository)
    {
        parent::__construct($repository);
    }
}