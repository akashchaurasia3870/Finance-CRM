<?php

namespace App\Repositories;

use App\Models\Email;

class EmailRepository extends BaseRepository
{
    public function __construct(Email $model)
    {
        parent::__construct($model);
    }

    public function findByStatus($status)
    {
        return $this->model->where('status', $status)->get();
    }

    public function findByTemplate($templateId)
    {
        return $this->model->where('email_template_id', $templateId)->get();
    }

    public function findSentEmails()
    {
        return $this->model->where('status', 'sent')->get();
    }

    public function findFailedEmails()
    {
        return $this->model->where('status', 'failed')->get();
    }
}