<?php

namespace App\Repositories;

use App\Models\Survey;

class SurveyRepository extends BaseRepository
{
    public function __construct(Survey $model)
    {
        parent::__construct($model);
    }

    public function findActiveSurveys()
    {
        return $this->model->where('status', 'active')
                          ->where('start_date', '<=', now())
                          ->where(function($query) {
                              $query->whereNull('end_date')
                                    ->orWhere('end_date', '>=', now());
                          })
                          ->with(['questions.options'])
                          ->get();
    }

    public function findSurveyWithQuestions($id)
    {
        return $this->model->with(['questions.options', 'creator'])->find($id);
    }

    public function findSurveyWithResponses($id)
    {
        return $this->model->with(['questions.options', 'responses.answers', 'responses.user'])->find($id);
    }
}