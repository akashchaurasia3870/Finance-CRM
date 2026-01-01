<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements RepositoryInterface
{
    protected $model;

    // We inject the specific Eloquent model through the constructor
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function findAll()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function add(array $data)
    {
        return $this->model->create($data);
    }

    public function edit(int $id, array $data)
    {
        $record = $this->model->findOrFail($id);
        return $record->update($data);
    }

    public function remove(int $id)
    {
        return $this->model->destroy($id);
    }
}