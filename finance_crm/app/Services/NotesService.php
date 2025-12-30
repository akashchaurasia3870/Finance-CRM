<?php

namespace App\Services;

use App\Repositories\NotesRepository;

class NotesService extends BaseService
{
    public function __construct(NotesRepository $repository)
    {
        parent::__construct($repository);
    }
}