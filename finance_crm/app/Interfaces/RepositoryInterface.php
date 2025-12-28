<?php

namespace App\Interfaces;

interface RepositoryInterface
{
    public function findAll();

    public function find(int $id);

    public function add(array $data);

    public function edit(int $id, array $data);

    public function remove(int $id);
}