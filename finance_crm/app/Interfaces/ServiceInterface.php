<?php

namespace App\Interfaces;

interface ServiceInterface
{
    public function getAllRecords(): array;

    public function getRecordById(int $id): ?object;

    public function createNewRecord(array $data): object;

    public function updateRecord(int $id, array $data): bool;

    public function deleteRecord(int $id): bool;
}