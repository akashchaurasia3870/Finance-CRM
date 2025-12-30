<?php

namespace App\Services;

use App\Repositories\EmailTemplateRepository;

class EmailTemplateService extends BaseService
{
    public function __construct(EmailTemplateRepository $repository)
    {
        parent::__construct($repository);
    }
}