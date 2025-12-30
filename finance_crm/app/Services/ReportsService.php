<?php

namespace App\Services;

use App\Repositories\ReportsRepository;

class ReportsService extends BaseService
{
    public function __construct(ReportsRepository $repository)
    {
        parent::__construct($repository);
    }
}