<?php

namespace App\Repositories;

use App\Models\Documents;

class DocumentsRepository extends BaseRepository
{
    public function __construct(Documents $model)
    {
        parent::__construct($model);
    }

    // You can add documents-specific methods here that aren't in the interface
    public function findActiveDocuments()
    {
        return $this->model->where('active', true)->get();
    }
}