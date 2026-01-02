<?php

namespace App\Http\Controllers;

use App\Services\EmailService;
use App\Services\EmailTemplateService;
use App\Services\CampaignsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailWebController extends Controller
{
    protected $emailService;
    protected $emailTemplateService;
    protected $campaignsService;

    public function __construct(EmailService $emailService, EmailTemplateService $emailTemplateService, CampaignsService $campaignsService)
    {
        $this->emailService = $emailService;
        $this->emailTemplateService = $emailTemplateService;
        $this->campaignsService = $campaignsService;
    }

    public function index()
    {
        $emails = collect($this->emailService->getAllRecords())->map(function ($email) {
            $emailModel = $this->emailService->getRecordById($email['id']);
            $emailModel->load(['template', 'creator']);
            return $emailModel->toArray();
        });
        return Inertia::render('Modules/Email/View', ['emails' => $emails]);
    }

    public function create()
    {
        $templates = $this->emailTemplateService->getActiveTemplates();
        $campaigns = $this->campaignsService->getAllRecords();
        return Inertia::render('Modules/Email/New', [
            'templates' => $templates,
            'campaigns' => $campaigns
        ]);
    }

    public function store(Request $request)
    {
        $rules = [
            'from_email' => 'nullable|email',
            'cc' => 'nullable|string',
            'bcc' => 'nullable|string',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'email_template_id' => 'nullable|exists:email_templates,id',
            'campaign_id' => 'nullable|exists:campaigns,id',
            'status' => 'in:draft,queued,sent,failed',
        ];
        
        // Make to_email required only if no campaign is selected
        if (empty($request->campaign_id)) {
            $rules['to_email'] = 'required|email';
        } else {
            $rules['to_email'] = 'nullable|email';
        }
        
        $request->validate($rules);

        $this->emailService->createNewRecord($request->all());
        return redirect('/email')->with('success', 'Email created successfully');
    }

    public function show($id)
    {
        $email = $this->emailService->getRecordById($id);
        $email->load(['template', 'campaign', 'creator']);
        return Inertia::render('Modules/Email/Detail', ['email' => $email]);
    }

    public function edit($id)
    {
        $email = $this->emailService->getRecordById($id);
        $templates = $this->emailTemplateService->getActiveTemplates();
        return Inertia::render('Modules/Email/Edit', [
            'email' => $email,
            'templates' => $templates
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'to_email' => 'required|email',
            'from_email' => 'nullable|email',
            'cc' => 'nullable|string',
            'bcc' => 'nullable|string',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'email_template_id' => 'nullable|exists:email_templates,id',
            'status' => 'in:draft,queued,sent,failed',
            'failure_reason' => 'nullable|string',
        ]);

        $this->emailService->updateRecord($id, $request->all());
        return redirect('/email')->with('success', 'Email updated successfully');
    }

    public function destroy($id)
    {
        $this->emailService->deleteRecord($id);
        return redirect('/email')->with('success', 'Email deleted successfully');
    }
}