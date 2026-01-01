<?php

namespace App\Http\Controllers;

use App\Services\LeadsService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsWebController extends Controller
{
    protected $leadsService;
    protected $userService;

    public function __construct(LeadsService $leadsService, UserService $userService)
    {
        $this->leadsService = $leadsService;
        $this->userService = $userService;
    }

    public function index()
    {
        $leads = collect($this->leadsService->getAllRecords())->map(function ($record) {
            $leadModel = $this->leadsService->getRecordById($record['id']);
            $leadModel->load(['assignedTo', 'creator']);
            return $leadModel->toArray();
        });
        return Inertia::render('Modules/Leads/View', ['leads' => $leads]);
    }

    public function create()
    {
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Leads/New', ['users' => $users]);
    }

    public function store(Request $request)
    {
        try {
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

            $this->leadsService->createNewRecord($request->all());
            return redirect('/leads')->with('success', 'Lead created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create lead: ' . $e->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $lead = $this->leadsService->getRecordById($id);
        $lead->load(['assignedTo', 'creator']);
        return Inertia::render('Modules/Leads/Detail', ['lead' => $lead]);
    }

    public function edit($id)
    {
        $lead = $this->leadsService->getRecordById($id);
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Leads/Edit', ['lead' => $lead, 'users' => $users]);
    }

    public function update(Request $request, $id)
    {
        try {
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

            $this->leadsService->updateRecord($id, $request->all());
            return redirect('/leads')->with('success', 'Lead updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update lead: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $this->leadsService->deleteRecord($id);
            return redirect('/leads')->with('success', 'Lead deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete lead: ' . $e->getMessage()]);
        }
    }
}