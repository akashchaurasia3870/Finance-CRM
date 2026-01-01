<?php

namespace App\Repositories;

use App\Models\Documents;

class DocumentsRepository extends BaseRepository
{
    public function __construct(Documents $model)
    {
        parent::__construct($model);
    }

    public function findActiveDocuments()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findByOwner(int $ownerId)
    {
        return $this->model->where('owned_by', $ownerId)->get();
    }

    public function findByFileType(string $fileType)
    {
        return $this->model->where('file_type', $fileType)->get();
    }

    public function createWithTimestamp(array $data)
    {
        if (isset($data['created_at'])) {
            $createdAt = $data['created_at'];
            unset($data['created_at']);
            
            $record = $this->model->create($data);
            $record->created_at = $createdAt;
            $record->save();
            
            return $record;
        }
        
        return $this->model->create($data);
    }
}