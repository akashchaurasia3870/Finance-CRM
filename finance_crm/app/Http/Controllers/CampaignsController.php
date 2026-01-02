<?php

namespace App\Http\Controllers;

use App\Services\CampaignsService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CampaignsController extends BaseController
{
    public function __construct(CampaignsService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'type' => 'in:email,sms,whatsapp,manual',
            'status' => 'in:draft,scheduled,active,paused,completed,cancelled',
        ]);

        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'type' => 'in:email,sms,whatsapp,manual',
            'status' => 'in:draft,scheduled,active,paused,completed,cancelled',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }
}