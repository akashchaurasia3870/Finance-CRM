<?php

namespace App\Repositories;

use App\Models\Calendar;

class CalendarRepository extends BaseRepository
{
    public function __construct(Calendar $model)
    {
        parent::__construct($model);
    }

    // You can add calendar-specific methods here that aren't in the interface
    public function findActiveCalendar()
    {
        return $this->model->where('active', true)->get();
    }
}