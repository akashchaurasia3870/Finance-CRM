<?php

namespace App\Http\Controllers;

use App\Services\EmailTemplateService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailTemplateWebController extends Controller
{
    protected $emailTemplateService;

    public function __construct(EmailTemplateService $emailTemplateService)
    {
        $this->emailTemplateService = $emailTemplateService;
    }

    public function index()
    {
        $templates = collect($this->emailTemplateService->getAllRecords())->map(function ($template) {
            $templateModel = $this->emailTemplateService->getRecordById($template['id']);
            $templateModel->load('creator');
            return $templateModel->toArray();
        });
        return Inertia::render('Modules/EmailTemplate/View', ['templates' => $templates]);
    }

    public function create()
    {
        return Inertia::render('Modules/EmailTemplate/New');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:email_templates,slug',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $this->emailTemplateService->createNewRecord($request->all());
        return redirect('/emailtemplate')->with('success', 'Email template created successfully');
    }

    public function show($id)
    {
        $template = $this->emailTemplateService->getRecordById($id);
        $template->load('creator');
        return Inertia::render('Modules/EmailTemplate/Detail', ['template' => $template]);
    }

    public function edit($id)
    {
        $template = $this->emailTemplateService->getRecordById($id);
        return Inertia::render('Modules/EmailTemplate/Edit', ['template' => $template]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:email_templates,slug,' . $id,
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $this->emailTemplateService->updateRecord($id, $request->all());
        return redirect('/emailtemplate')->with('success', 'Email template updated successfully');
    }

    public function destroy($id)
    {
        $this->emailTemplateService->deleteRecord($id);
        return redirect('/emailtemplate')->with('success', 'Email template deleted successfully');
    }
}