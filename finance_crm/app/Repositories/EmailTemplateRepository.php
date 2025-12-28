<?php

namespace App\Repositories;

use App\Models\EmailTemplate;

class EmailTemplateRepository extends BaseRepository
{
    public function __construct(EmailTemplate $model)
    {
        parent::__construct($model);
    }

    // You can add emailtemplate-specific methods here that aren't in the interface
    public function findActiveEmailTemplate()
    {
        return $this->model->where('active', true)->get();
    }
}