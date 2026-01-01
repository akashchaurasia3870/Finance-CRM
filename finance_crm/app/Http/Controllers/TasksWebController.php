<?php

namespace App\Http\Controllers;

use App\Services\TasksService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TasksWebController extends Controller
{
    protected $tasksService;
    protected $userService;

    public function __construct(TasksService $tasksService, UserService $userService)
    {
        $this->tasksService = $tasksService;
        $this->userService = $userService;
    }

    public function index()
    {
        $tasks = collect($this->tasksService->getAllRecords())->map(function ($record) {
            $taskModel = $this->tasksService->getRecordById($record['id']);
            $taskModel->load(['assignedTo', 'creator']);
            return $taskModel->toArray();
        });
        return Inertia::render('Modules/Tasks/View', ['tasks' => $tasks]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Tasks/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'assigned_to' => 'nullable|exists:users,id',
                'entity_type' => 'nullable|string|max:255',
                'entity_id' => 'nullable|integer',
                'start_date' => 'nullable|date',
                'due_date' => 'nullable|date|after_or_equal:start_date',
                'completed_at' => 'nullable|date',
                'priority' => 'nullable|in:low,medium,high',
                'status' => 'nullable|in:pending,in_progress,completed,cancelled',
            ]);

            $this->tasksService->createNewRecord($request->all());
            return redirect('/tasks')->with('success', 'Task created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create task: ' . $e->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $task = $this->tasksService->getRecordById($id);
        $task->load(['assignedTo', 'creator']);
        return Inertia::render('Modules/Tasks/Detail', ['task' => $task]);
    }

    public function edit($id)
    {
        $task = $this->tasksService->getRecordById($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Tasks/Edit', ['task' => $task, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'assigned_to' => 'nullable|exists:users,id',
                'entity_type' => 'nullable|string|max:255',
                'entity_id' => 'nullable|integer',
                'start_date' => 'nullable|date',
                'due_date' => 'nullable|date|after_or_equal:start_date',
                'completed_at' => 'nullable|date',
                'priority' => 'nullable|in:low,medium,high',
                'status' => 'nullable|in:pending,in_progress,completed,cancelled',
            ]);

            $this->tasksService->updateRecord($id, $request->all());
            return redirect('/tasks')->with('success', 'Task updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update task: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $this->tasksService->deleteRecord($id);
            return redirect('/tasks')->with('success', 'Task deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete task: ' . $e->getMessage()]);
        }
    }
}