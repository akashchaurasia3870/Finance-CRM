<?php

namespace App\Services;

use App\Repositories\SurveyRepository;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\SurveyResponse;
use App\Models\SurveyAnswer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SurveyService extends BaseService
{
    public function __construct(SurveyRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        return DB::transaction(function () use ($data) {
            $data['created_by'] = Auth::id();
            $survey = $this->repository->add($data);
            
            if (isset($data['questions'])) {
                $this->createQuestions($survey->id, $data['questions']);
            }
            
            return $survey;
        });
    }

    public function updateRecord(int $id, array $data): bool
    {
        return DB::transaction(function () use ($id, $data) {
            $updated = $this->repository->edit($id, $data);
            
            if (isset($data['questions'])) {
                // Delete existing questions and create new ones
                SurveyQuestion::where('survey_id', $id)->delete();
                $this->createQuestions($id, $data['questions']);
            }
            
            return $updated;
        });
    }

    private function createQuestions($surveyId, $questions)
    {
        foreach ($questions as $questionData) {
            $questionData['survey_id'] = $surveyId;
            $questionData['created_by'] = Auth::id();
            
            $question = SurveyQuestion::create($questionData);
            
            if (isset($questionData['options'])) {
                foreach ($questionData['options'] as $optionData) {
                    $optionData['question_id'] = $question->id;
                    $optionData['created_by'] = Auth::id();
                    SurveyQuestionOption::create($optionData);
                }
            }
        }
    }

    public function getActiveSurveys()
    {
        return $this->repository->findActiveSurveys();
    }

    public function getSurveyWithQuestions($id)
    {
        return $this->repository->findSurveyWithQuestions($id);
    }

    public function getSurveyWithResponses($id)
    {
        return $this->repository->findSurveyWithResponses($id);
    }

    public function submitResponse($surveyId, $answers, $userId = null)
    {
        return DB::transaction(function () use ($surveyId, $answers, $userId) {
            $response = SurveyResponse::create([
                'survey_id' => $surveyId,
                'user_id' => $userId,
                'session_id' => session()->getId(),
                'ip_address' => request()->ip(),
                'submitted_at' => now(),
                'created_by' => $userId,
            ]);
            
            foreach ($answers as $questionId => $answer) {
                SurveyAnswer::create([
                    'response_id' => $response->id,
                    'question_id' => $questionId,
                    'answer' => is_array($answer) ? json_encode($answer) : $answer,
                    'created_by' => $userId,
                ]);
            }
            
            return $response;
        });
    }
}