<?php

namespace App\Services;

use App\Repositories\MeetingsRepository;
use Illuminate\Support\Facades\Auth;

class MeetingsService extends BaseService
{
    public function __construct(MeetingsRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = Auth::id();
        if (!isset($data['organizer_id'])) {
            $data['organizer_id'] = Auth::id();
        }
        return parent::createNewRecord($data);
    }

    public function getAllWithRelations()
    {
        return $this->repository->getAllWithRelations();
    }

    public function getRecordByIdWithRelations($id)
    {
        return $this->repository->findByIdWithRelations($id);
    }

    public function getUpcomingMeetings()
    {
        return $this->repository->findUpcomingMeetings();
    }

    public function getMeetingsByOrganizer($organizerId)
    {
        return $this->repository->findMeetingsByOrganizer($organizerId);
    }
}