<?php

namespace App\Http\Controllers;

use App\Services\AttendanceService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceWebController extends Controller
{
    protected $attendanceService;
    protected $userService;

    public function __construct(AttendanceService $attendanceService, UserService $userService)
    {
        $this->attendanceService = $attendanceService;
        $this->userService = $userService;
    }

    public function index()
    {
        $attendance = collect($this->attendanceService->getAllRecords())->map(function ($record) {
            $attendanceModel = $this->attendanceService->getRecordById($record['id']);
            $attendanceModel->load(['user', 'creator']);
            return $attendanceModel->toArray();
        });
        return Inertia::render('Modules/Attendance/View', ['attendance' => $attendance]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Attendance/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        try {
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

            $this->attendanceService->createNewRecord($request->all());
            return redirect('/attendance')->with('success', 'Attendance record created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create attendance record: ' . $e->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $attendance = $this->attendanceService->getRecordById($id);
        $attendance->load(['user', 'creator']);
        return Inertia::render('Modules/Attendance/Detail', ['attendance' => $attendance]);
    }

    public function edit($id)
    {
        $attendance = $this->attendanceService->getRecordById($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Attendance/Edit', ['attendance' => $attendance, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        try {
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

            $this->attendanceService->updateRecord($id, $request->all());
            return redirect('/attendance')->with('success', 'Attendance record updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update attendance record: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $this->attendanceService->deleteRecord($id);
            return redirect('/attendance')->with('success', 'Attendance record deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete attendance record: ' . $e->getMessage()]);
        }
    }
}