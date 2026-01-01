<?php

namespace App\Repositories;

use App\Models\Notes;

class NotesRepository extends BaseRepository
{
    public function __construct(Notes $model)
    {
        parent::__construct($model);
    }

    public function findByCreator(int $userId)
    {
        return $this->model->where('created_by', $userId)->get();
    }

    public function findByClient(int $clientId)
    {
        return $this->model->where('client_id', $clientId)->get();
    }

    public function findByCategory(string $category)
    {
        return $this->model->where('category', $category)->get();
    }

    public function searchByTitle(string $search)
    {
        return $this->model->where('title', 'like', '%' . $search . '%')->get();
    }
}