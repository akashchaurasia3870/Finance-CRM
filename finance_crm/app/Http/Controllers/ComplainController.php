<?php

namespace App\Http\Controllers;

use App\Services\ComplainService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ComplainController extends BaseController
{
    public function __construct(ComplainService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client_id' => 'nullable|exists:clients,id',
            'complainant_name' => 'required|string|max:255',
            'complainant_email' => 'nullable|email',
            'complainant_phone' => 'nullable|string|max:20',
            'priority' => 'in:low,medium,high',
            'status' => 'in:open,in_progress,resolved,closed',
            'assigned_to' => 'nullable|exists:users,id',
            'source' => 'nullable|string|max:255',
        ]);

        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client_id' => 'nullable|exists:clients,id',
            'complainant_name' => 'required|string|max:255',
            'complainant_email' => 'nullable|email',
            'complainant_phone' => 'nullable|string|max:20',
            'priority' => 'in:low,medium,high',
            'status' => 'in:open,in_progress,resolved,closed',
            'assigned_to' => 'nullable|exists:users,id',
            'resolution_notes' => 'nullable|string',
            'source' => 'nullable|string|max:255',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }
}