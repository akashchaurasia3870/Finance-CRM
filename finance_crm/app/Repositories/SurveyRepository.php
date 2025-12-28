<?php

namespace App\Repositories;

use App\Models\Survey;

class SurveyRepository extends BaseRepository
{
    public function __construct(Survey $model)
    {
        parent::__construct($model);
    }

    // You can add survey-specific methods here that aren't in the interface
    public function findActiveSurvey()
    {
        return $this->model->where('active', true)->get();
    }
}