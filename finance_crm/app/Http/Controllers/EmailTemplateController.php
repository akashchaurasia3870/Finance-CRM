<?php

namespace App\Http\Controllers;

use App\Services\EmailTemplateService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class EmailTemplateController extends BaseController
{
    public function __construct(EmailTemplateService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:email_templates,slug',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'version' => 'integer|min:1',
        ]);

        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:email_templates,slug,' . $id,
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'version' => 'integer|min:1',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }
}