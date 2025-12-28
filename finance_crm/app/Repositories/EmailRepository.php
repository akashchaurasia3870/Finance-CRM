<?php

namespace App\Repositories;

use App\Models\Email;

class EmailRepository extends BaseRepository
{
    public function __construct(Email $model)
    {
        parent::__construct($model);
    }

    // You can add email-specific methods here that aren't in the interface
    public function findActiveEmail()
    {
        return $this->model->where('active', true)->get();
    }
}