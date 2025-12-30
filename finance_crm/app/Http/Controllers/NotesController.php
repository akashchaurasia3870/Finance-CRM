<?php

namespace App\Http\Controllers;

use App\Services\NotesService;

class NotesController extends BaseController
{
    public function __construct(NotesService $service)
    {
        parent::__construct($service);
    }
}