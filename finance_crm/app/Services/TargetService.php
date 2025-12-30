<?php

namespace App\Services;

use App\Repositories\TargetRepository;

class TargetService extends BaseService
{
    public function __construct(TargetRepository $repository)
    {
        parent::__construct($repository);
    }
}