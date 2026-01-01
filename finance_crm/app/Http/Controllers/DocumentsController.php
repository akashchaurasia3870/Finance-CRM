<?php

namespace App\Http\Controllers;

use App\Services\DocumentsService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DocumentsController extends BaseController
{
    public function __construct(DocumentsService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|max:10240', // 10MB max
            'owned_by' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $record = $this->service->uploadDocument($request->file('file'), $request->except('file'));
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'owned_by' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }

    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->service->deleteDocument($id);
        return response()->json(['success' => $deleted]);
    }
}