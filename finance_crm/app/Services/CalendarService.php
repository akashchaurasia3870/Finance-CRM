<?php

namespace App\Services;

use App\Repositories\CalendarRepository;

class CalendarService extends BaseService
{
    public function __construct(CalendarRepository $repository)
    {
        parent::__construct($repository);
    }
}