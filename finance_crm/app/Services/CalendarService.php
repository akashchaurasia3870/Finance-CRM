<?php

namespace App\Services;

use App\Repositories\CalendarRepository;
use Illuminate\Support\Facades\Auth;

class CalendarService extends BaseService
{
    public function __construct(CalendarRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        $data['created_by'] = Auth::id();
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

    public function getUpcomingEvents()
    {
        return $this->repository->findUpcomingEvents();
    }

    public function getEventsByType($type)
    {
        return $this->repository->findEventsByType($type);
    }
}