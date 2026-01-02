<?php

namespace App\Repositories;

use App\Models\EmailTemplate;

class EmailTemplateRepository extends BaseRepository
{
    public function __construct(EmailTemplate $model)
    {
        parent::__construct($model);
    }

    public function findActiveTemplates()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function findByCategory($category)
    {
        return $this->model->where('category', $category)->get();
    }

    public function findBySlug($slug)
    {
        return $this->model->where('slug', $slug)->first();
    }
}