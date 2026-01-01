<?php

namespace App\Http\Controllers;

use App\Services\NotesService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NotesController extends BaseController
{
    public function __construct(NotesService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'nullable|string|max:255',
            'client_id' => 'nullable|exists:clients,id',
        ]);

        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'nullable|string|max:255',
            'client_id' => 'nullable|exists:clients,id',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }
}