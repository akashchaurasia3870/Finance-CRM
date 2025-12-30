<?php

namespace App\Services;

use App\Interfaces\ServiceInterface;
use App\Interfaces\RepositoryInterface;

class BaseService implements ServiceInterface
{
    protected $repository;

    // Inject the Repository Interface
    public function __construct(RepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAllRecords(): array
    {
        return $this->repository->findAll();
    }

    public function getRecordById(int $id): ?object
    {
        return $this->repository->find($id);
    }

    public function createNewRecord(array $data): object
    {
        // Business logic (e.g., hash passwords, fire events) can go here
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        return $this->repository->edit($id, $data);
    }

    public function deleteRecord(int $id): bool
    {
        return $this->repository->remove($id);
    }
}