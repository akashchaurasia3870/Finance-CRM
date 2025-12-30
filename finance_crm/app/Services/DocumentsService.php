<?php

namespace App\Services;

use App\Repositories\DocumentsRepository;

class DocumentsService extends BaseService
{
    public function __construct(DocumentsRepository $repository)
    {
        parent::__construct($repository);
    }
}