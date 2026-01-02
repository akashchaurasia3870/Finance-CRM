<?php

namespace App\Http\Controllers;

use App\Services\SurveyService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SurveyController extends BaseController
{
    public function __construct(SurveyService $service)
    {
        parent::__construct($service);
    }

    public function index(): JsonResponse
    {
        $surveys = $this->service->getAllRecords();
        return response()->json($surveys);
    }

    public function show(int $id): JsonResponse
    {
        $survey = $this->service->getSurveyWithQuestions($id);
        return $survey ? response()->json($survey) : response()->json(['error' => 'Survey not found'], 404);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:draft,active,paused,closed',
            'questions' => 'array',
            'questions.*.question' => 'required|string',
            'questions.*.type' => 'required|in:text,textarea,radio,checkbox,dropdown,rating',
            'questions.*.is_required' => 'boolean',
            'questions.*.options' => 'array',
            'questions.*.options.*.option_text' => 'required|string',
        ]);

        $survey = $this->service->createNewRecord($request->all());
        return response()->json($survey, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:draft,active,paused,closed',
            'questions' => 'array',
            'questions.*.question' => 'required|string',
            'questions.*.type' => 'required|in:text,textarea,radio,checkbox,dropdown,rating',
            'questions.*.is_required' => 'boolean',
            'questions.*.options' => 'array',
            'questions.*.options.*.option_text' => 'required|string',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }

    public function getActiveSurveys(): JsonResponse
    {
        $surveys = $this->service->getActiveSurveys();
        return response()->json($surveys);
    }

    public function submitResponse(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'answers' => 'required|array',
        ]);

        $response = $this->service->submitResponse($id, $request->answers, Auth::id());
        return response()->json($response, 201);
    }

    public function getResults(int $id): JsonResponse
    {
        $survey = $this->service->getSurveyWithResponses($id);
        return $survey ? response()->json($survey) : response()->json(['error' => 'Survey not found'], 404);
    }
}