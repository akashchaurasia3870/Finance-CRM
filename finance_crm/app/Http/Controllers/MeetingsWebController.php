<?php

namespace App\Http\Controllers;

use App\Services\MeetingsService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MeetingsWebController extends Controller
{
    protected $meetingsService;
    protected $userService;

    public function __construct(MeetingsService $meetingsService, UserService $userService)
    {
        $this->meetingsService = $meetingsService;
        $this->userService = $userService;
    }

    public function index()
    {
        $meetings = $this->meetingsService->getAllWithRelations();
        return Inertia::render('Modules/Meetings/View', ['meetings' => $meetings]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Meetings/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url',
            'organizer_id' => 'nullable|exists:users,id',
            'status' => 'in:scheduled,ongoing,completed,cancelled',
        ]);

        $this->meetingsService->createNewRecord($request->all());
        return redirect('/meetings')->with('success', 'Meeting created successfully');
    }

    public function show($id)
    {
        $meeting = $this->meetingsService->getRecordByIdWithRelations($id);
        return Inertia::render('Modules/Meetings/Detail', ['meeting' => $meeting]);
    }

    public function edit($id)
    {
        $meeting = $this->meetingsService->getRecordById($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Meetings/Edit', ['meeting' => $meeting, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url',
            'organizer_id' => 'nullable|exists:users,id',
            'status' => 'in:scheduled,ongoing,completed,cancelled',
        ]);

        $this->meetingsService->updateRecord($id, $request->all());
        return redirect('/meetings')->with('success', 'Meeting updated successfully');
    }

    public function destroy($id)
    {
        $this->meetingsService->deleteRecord($id);
        return redirect('/meetings')->with('success', 'Meeting deleted successfully');
    }

    public function addNote(Request $request, $id)
    {
        $request->validate([
            'notes' => 'required|string',
        ]);

        $meeting = $this->meetingsService->getRecordById($id);
        if (!$meeting) {
            return redirect('/meetings')->with('error', 'Meeting not found');
        }

        \App\Models\MeetingNote::create([
            'meeting_id' => $id,
            'notes' => $request->notes,
            'created_by' => auth()->id(),
        ]);

        return redirect("/meetings/{$id}")->with('success', 'Note added successfully');
    }
}