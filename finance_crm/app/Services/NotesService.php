<?php

namespace App\Services;

use App\Repositories\NotesRepository;
use Illuminate\Support\Facades\Auth;

class NotesService extends BaseService
{
    public function __construct(NotesRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        return $this->repository->edit($id, $data);
    }

    public function getNotesByCreator(int $userId)
    {
        return $this->repository->findByCreator($userId);
    }

    public function getNotesByClient(int $clientId)
    {
        return $this->repository->findByClient($clientId);
    }

    public function getNotesByCategory(string $category)
    {
        return $this->repository->findByCategory($category);
    }

    public function searchNotesByTitle(string $search)
    {
        return $this->repository->searchByTitle($search);
    }
}