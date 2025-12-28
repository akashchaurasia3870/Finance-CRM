<?php

namespace App\Repositories;

use App\Models\Notes;

class NotesRepository extends BaseRepository
{
    public function __construct(Notes $model)
    {
        parent::__construct($model);
    }

    // You can add notes-specific methods here that aren't in the interface
    public function findActiveNotes()
    {
        return $this->model->where('active', true)->get();
    }
}