<?php

namespace App\Services;

use App\Repositories\EmailTemplateRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class EmailTemplateService extends BaseService
{
    public function __construct(EmailTemplateRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['is_active'] = $data['is_active'] ?? true;
        $data['version'] = $data['version'] ?? 1;
        
        if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        
        return $this->repository->add($data);
    }

    public function getActiveTemplates()
    {
        return $this->repository->findActiveTemplates();
    }

    public function getTemplatesByCategory($category)
    {
        return $this->repository->findByCategory($category);
    }

    public function getTemplateBySlug($slug)
    {
        return $this->repository->findBySlug($slug);
    }
}