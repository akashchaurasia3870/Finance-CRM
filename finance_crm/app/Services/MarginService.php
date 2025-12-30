<?php

namespace App\Services;

use App\Repositories\MarginRepository;

class MarginService extends BaseService
{
    public function __construct(MarginRepository $repository)
    {
        parent::__construct($repository);
    }
}