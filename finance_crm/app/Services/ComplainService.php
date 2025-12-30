<?php

namespace App\Services;

use App\Repositories\ComplainRepository;

class ComplainService extends BaseService
{
    public function __construct(ComplainRepository $repository)
    {
        parent::__construct($repository);
    }
}