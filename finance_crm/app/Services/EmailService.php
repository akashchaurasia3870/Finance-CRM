<?php

namespace App\Services;

use App\Repositories\EmailRepository;

class EmailService extends BaseService
{
    public function __construct(EmailRepository $repository)
    {
        parent::__construct($repository);
    }
}