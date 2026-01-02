<?php

namespace App\Http\Controllers;

use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmailController extends BaseController
{
    public function __construct(EmailService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
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
        ]);

        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
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

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }
}