<?php

namespace App\Http\Controllers;

use App\Services\LeadsService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LeadsController extends BaseController
{
    public function __construct(LeadsService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'assigned_to' => 'nullable|exists:users,id',
            'source' => 'nullable|string|max:255',
            'campaign' => 'nullable|string|max:255',
            'status' => 'nullable|in:new,contacted,qualified,converted,lost',
            'value' => 'nullable|numeric|min:0',
            'follow_up_date' => 'nullable|date',
            'converted_at' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'assigned_to' => 'nullable|exists:users,id',
            'source' => 'nullable|string|max:255',
            'campaign' => 'nullable|string|max:255',
            'status' => 'nullable|in:new,contacted,qualified,converted,lost',
            'value' => 'nullable|numeric|min:0',
            'follow_up_date' => 'nullable|date',
            'converted_at' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }
}