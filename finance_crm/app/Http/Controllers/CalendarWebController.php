<?php

namespace App\Http\Controllers;

use App\Services\CalendarService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarWebController extends Controller
{
    protected $calendarService;
    protected $userService;

    public function __construct(CalendarService $calendarService, UserService $userService)
    {
        $this->calendarService = $calendarService;
        $this->userService = $userService;
    }

    public function index()
    {
        $calendars = $this->calendarService->getAllWithRelations();
        return Inertia::render('Modules/Calendar/View', ['calendars' => $calendars]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Calendar/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'type' => 'in:meeting,event,reminder,task,note',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url',
            'is_all_day' => 'boolean',
            'status' => 'in:scheduled,completed,cancelled',
        ]);

        $this->calendarService->createNewRecord($request->all());
        return redirect('/calendar')->with('success', 'Calendar event created successfully');
    }

    public function show($id)
    {
        $calendar = $this->calendarService->getRecordByIdWithRelations($id);
        return Inertia::render('Modules/Calendar/Detail', ['calendar' => $calendar]);
    }

    public function edit($id)
    {
        $calendar = $this->calendarService->getRecordByIdWithRelations($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Calendar/Edit', ['calendar' => $calendar, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_datetime' => 'required|date',
            'end_datetime' => 'required|date|after:start_datetime',
            'type' => 'in:meeting,event,reminder,task,note',
            'location' => 'nullable|string|max:255',
            'meeting_link' => 'nullable|url',
            'is_all_day' => 'boolean',
            'status' => 'in:scheduled,completed,cancelled',
        ]);

        $this->calendarService->updateRecord($id, $request->all());
        return redirect('/calendar')->with('success', 'Calendar event updated successfully');
    }

    public function destroy($id)
    {
        $this->calendarService->deleteRecord($id);
        return redirect('/calendar')->with('success', 'Calendar event deleted successfully');
    }

    public function addNote(Request $request, $id)
    {
        $request->validate([
            'note' => 'required|string',
        ]);

        \App\Models\CalendarNote::create([
            'calendar_id' => $id,
            'note' => $request->note,
            'created_by' => auth()->id(),
        ]);

        return redirect("/calendar/{$id}")->with('success', 'Note added successfully');
    }

    public function calendarView()
    {
        $calendars = $this->calendarService->getAllWithRelations();
        return Inertia::render('Modules/Calendar/CalendarView', ['calendars' => $calendars]);
    }

    public function reports()
    {
        $calendars = $this->calendarService->getAllWithRelations();
        $stats = [
            'total_events' => count($calendars),
            'scheduled' => count(array_filter($calendars->toArray(), fn($c) => $c['status'] === 'scheduled')),
            'completed' => count(array_filter($calendars->toArray(), fn($c) => $c['status'] === 'completed')),
            'cancelled' => count(array_filter($calendars->toArray(), fn($c) => $c['status'] === 'cancelled')),
            'by_type' => [
                'meeting' => count(array_filter($calendars->toArray(), fn($c) => $c['type'] === 'meeting')),
                'event' => count(array_filter($calendars->toArray(), fn($c) => $c['type'] === 'event')),
                'reminder' => count(array_filter($calendars->toArray(), fn($c) => $c['type'] === 'reminder')),
                'task' => count(array_filter($calendars->toArray(), fn($c) => $c['type'] === 'task')),
                'note' => count(array_filter($calendars->toArray(), fn($c) => $c['type'] === 'note')),
            ]
        ];
        return Inertia::render('Modules/Calendar/Reports', ['calendars' => $calendars, 'stats' => $stats]);
    }
}