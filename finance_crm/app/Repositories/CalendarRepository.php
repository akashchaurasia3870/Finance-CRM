<?php

namespace App\Repositories;

use App\Models\Calendar;

class CalendarRepository extends BaseRepository
{
    public function __construct(Calendar $model)
    {
        parent::__construct($model);
    }

    public function findActiveCalendar()
    {
        return $this->model->where('status', '!=', 'cancelled')->get();
    }

    public function findUpcomingEvents()
    {
        return $this->model->where('start_datetime', '>', now())
                          ->where('status', 'scheduled')
                          ->orderBy('start_datetime')
                          ->get();
    }

    public function findEventsByType($type)
    {
        return $this->model->where('type', $type)->get();
    }

    public function getAllWithRelations()
    {
        return $this->model->with(['creator', 'participants.user', 'notes.creator'])->get();
    }

    public function findByIdWithRelations($id)
    {
        return $this->model->with(['creator', 'participants.user', 'notes.creator'])->find($id);
    }
}