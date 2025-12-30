<?php

namespace App\Http\Controllers;

use App\Services\DocumentsService;

class DocumentsController extends BaseController
{
    public function __construct(DocumentsService $service)
    {
        parent::__construct($service);
    }
}