<?php

namespace App\Http\Controllers;

use App\Services\SurveyService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SurveyWebController extends Controller
{
    protected $surveyService;

    public function __construct(SurveyService $surveyService)
    {
        $this->surveyService = $surveyService;
    }

    public function index()
    {
        $surveys = collect($this->surveyService->getAllRecords())->map(function ($survey) {
            $surveyModel = $this->surveyService->getRecordById($survey['id']);
            $surveyModel->load(['creator', 'questions']);
            return $surveyModel->toArray();
        });
        return Inertia::render('Modules/Survey/View', ['surveys' => $surveys]);
    }

    public function create()
    {
        return Inertia::render('Modules/Survey/New');
    }

    public function store(Request $request)
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

        $this->surveyService->createNewRecord($request->all());
        return redirect('/survey')->with('success', 'Survey created successfully');
    }

    public function show($id)
    {
        $survey = $this->surveyService->getSurveyWithQuestions($id);
        return Inertia::render('Modules/Survey/Detail', ['survey' => $survey]);
    }

    public function edit($id)
    {
        $survey = $this->surveyService->getSurveyWithQuestions($id);
        return Inertia::render('Modules/Survey/Edit', ['survey' => $survey]);
    }

    public function update(Request $request, $id)
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

        $this->surveyService->updateRecord($id, $request->all());
        return redirect('/survey')->with('success', 'Survey updated successfully');
    }

    public function destroy($id)
    {
        $this->surveyService->deleteRecord($id);
        return redirect('/survey')->with('success', 'Survey deleted successfully');
    }

    public function results($id)
    {
        $survey = $this->surveyService->getSurveyWithResponses($id);
        return Inertia::render('Modules/Survey/Results', ['survey' => $survey]);
    }
}