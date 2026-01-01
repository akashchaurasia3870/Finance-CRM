<?php

namespace App\Http\Controllers;

use App\Services\AttendanceService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AttendanceController extends BaseController
{
    public function __construct(AttendanceService $service)
    {
        parent::__construct($service);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'attendance_date' => 'required|date',
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i',
            'work_hours' => 'nullable|numeric|min:0|max:24',
            'status' => 'required|in:present,absent,half_day,leave',
            'source' => 'nullable|in:biometric,manual,mobile,system',
            'is_active' => 'boolean',
        ]);

        $record = $this->service->createNewRecord($request->all());
        return response()->json($record, 201);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'attendance_date' => 'required|date',
            'check_in_time' => 'nullable|date_format:H:i',
            'check_out_time' => 'nullable|date_format:H:i',
            'work_hours' => 'nullable|numeric|min:0|max:24',
            'status' => 'required|in:present,absent,half_day,leave',
            'source' => 'nullable|in:biometric,manual,mobile,system',
            'is_active' => 'boolean',
        ]);

        $updated = $this->service->updateRecord($id, $request->all());
        return response()->json(['success' => $updated]);
    }
}