<?php

namespace App\Repositories;

use App\Models\Meetings;

class MeetingsRepository extends BaseRepository
{
    public function __construct(Meetings $model)
    {
        parent::__construct($model);
    }

    // You can add meetings-specific methods here that aren't in the interface
    public function findActiveMeetings()
    {
        return $this->model->where('active', true)->get();
    }
}