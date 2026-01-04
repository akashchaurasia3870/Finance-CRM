<?php

namespace App\Repositories;

use App\Models\Meetings;

class MeetingsRepository extends BaseRepository
{
    public function __construct(Meetings $model)
    {
        parent::__construct($model);
    }

    public function findActiveMeetings()
    {
        return $this->model->where('status', '!=', 'cancelled')->get();
    }

    public function findUpcomingMeetings()
    {
        return $this->model->where('start_time', '>', now())
                          ->where('status', 'scheduled')
                          ->orderBy('start_time')
                          ->get();
    }

    public function findMeetingsByOrganizer($organizerId)
    {
        return $this->model->where('organizer_id', $organizerId)->get();
    }

    public function getAllWithRelations()
    {
        return $this->model->with(['organizer', 'creator', 'participants.user'])->get();
    }

    public function findByIdWithRelations($id)
    {
        return $this->model->with(['organizer', 'creator', 'participants.user', 'notes.creator'])->find($id);
    }
}