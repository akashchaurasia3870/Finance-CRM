<?php

namespace App\Services;

use App\Repositories\MeetingsRepository;

class MeetingsService extends BaseService
{
    public function __construct(MeetingsRepository $repository)
    {
        parent::__construct($repository);
    }
}