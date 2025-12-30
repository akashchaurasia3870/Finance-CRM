<?php

namespace App\Services;

use App\Repositories\SurveyRepository;

class SurveyService extends BaseService
{
    public function __construct(SurveyRepository $repository)
    {
        parent::__construct($repository);
    }
}