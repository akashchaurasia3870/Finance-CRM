<?php

namespace App\Http\Controllers;

use App\Services\TargetService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TargetWebController extends Controller
{
    protected $targetService;
    protected $userService;

    public function __construct(TargetService $targetService, UserService $userService)
    {
        $this->targetService = $targetService;
        $this->userService = $userService;
    }

    public function index()
    {
        $targets = collect($this->targetService->getAllRecords())->map(function ($record) {
            $targetModel = $this->targetService->getRecordById($record['id']);
            $targetModel->load(['assignedTo', 'creator']);
            return $targetModel->toArray();
        });
        return Inertia::render('Modules/Target/View', ['targets' => $targets]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Target/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'target_value' => 'required|numeric|min:0',
                'achieved_value' => 'nullable|numeric|min:0',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'assigned_to' => 'nullable|exists:users,id',
            ]);

            $this->targetService->createNewRecord($request->all());
            return redirect('/target')->with('success', 'Target created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create target: ' . $e->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $target = $this->targetService->getRecordById($id);
        $target->load(['assignedTo', 'creator']);
        return Inertia::render('Modules/Target/Detail', ['target' => $target]);
    }

    public function edit($id)
    {
        $target = $this->targetService->getRecordById($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Target/Edit', ['target' => $target, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'target_value' => 'required|numeric|min:0',
                'achieved_value' => 'nullable|numeric|min:0',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'assigned_to' => 'nullable|exists:users,id',
            ]);

            $this->targetService->updateRecord($id, $request->all());
            return redirect('/target')->with('success', 'Target updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update target: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $this->targetService->deleteRecord($id);
            return redirect('/target')->with('success', 'Target deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete target: ' . $e->getMessage()]);
        }
    }
}