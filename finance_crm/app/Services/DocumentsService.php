<?php

namespace App\Services;

use App\Repositories\DocumentsRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DocumentsService extends BaseService
{
    public function __construct(DocumentsRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
            $data['owned_by'] = $data['owned_by'] ?? Auth::id();
        }
        
        $data['is_active'] = $data['is_active'] ?? true;
        
        return $this->repository->add($data);
    }

    public function uploadDocument(UploadedFile $file, array $data): object
    {
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('documents', $fileName, 'public');
        
        $documentData = array_merge($data, [
            'name' => $data['name'] ?? $file->getClientOriginalName(),
            'file_path' => $filePath,
            'file_type' => $file->getClientOriginalExtension(),
            'file_size' => $file->getSize(),
        ]);
        
        return $this->createNewRecord($documentData);
    }

    public function getActiveDocuments()
    {
        return $this->repository->findActiveDocuments();
    }

    public function getDocumentsByOwner(int $ownerId)
    {
        return $this->repository->findByOwner($ownerId);
    }

    public function replaceDocument(int $id, UploadedFile $file, array $data): object
    {
        // Get the original document
        $originalDocument = $this->repository->find($id);
        
        // Soft delete the original document
        $this->repository->remove($id);
        
        // Upload new file
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('documents', $fileName, 'public');
        
        // Prepare new document data with original created_at
        $documentData = array_merge($data, [
            'name' => $data['name'] ?? $file->getClientOriginalName(),
            'file_path' => $filePath,
            'file_type' => $file->getClientOriginalExtension(),
            'file_size' => $file->getSize(),
            'created_by' => $originalDocument->created_by,
            'owned_by' => $data['owned_by'] ?? $originalDocument->owned_by,
            'created_at' => $originalDocument->created_at, // Keep original created_at
        ]);
        
        // Create new document
        return $this->repository->createWithTimestamp($documentData);
    }

    public function deleteDocument(int $id): bool
    {
        $document = $this->repository->find($id);
        if ($document && $document->file_path) {
            Storage::disk('public')->delete($document->file_path);
        }
        return $this->repository->remove($id);
    }
}