<?php

namespace App\Http\Controllers;

use App\Services\ComplainService;
use App\Services\ClientService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplainWebController extends Controller
{
    protected $complainService;
    protected $clientService;
    protected $userService;

    public function __construct(ComplainService $complainService, ClientService $clientService, UserService $userService)
    {
        $this->complainService = $complainService;
        $this->clientService = $clientService;
        $this->userService = $userService;
    }

    public function index()
    {
        $complains = collect($this->complainService->getAllRecords())->map(function ($complain) {
            $complainModel = $this->complainService->getRecordById($complain['id']);
            $complainModel->load(['client', 'assignedUser', 'creator']);
            return $complainModel->toArray();
        });
        return Inertia::render('Modules/Complain/View', ['complains' => $complains]);
    }

    public function create()
    {
        $clients = $this->clientService->getAllRecords();
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Complain/New', [
            'clients' => $clients,
            'users' => $users
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client_id' => 'nullable|exists:clients,id',
            'complainant_name' => 'required|string|max:255',
            'complainant_email' => 'nullable|email',
            'complainant_phone' => 'nullable|string|max:20',
            'priority' => 'in:low,medium,high',
            'status' => 'in:open,in_progress,resolved,closed',
            'assigned_to' => 'nullable|exists:users,id',
            'source' => 'nullable|string|max:255',
        ]);

        $this->complainService->createNewRecord($request->all());
        return redirect('/complain')->with('success', 'Complain created successfully');
    }

    public function show($id)
    {
        $complain = $this->complainService->getRecordById($id);
        $complain->load(['client', 'assignedUser', 'creator']);
        return Inertia::render('Modules/Complain/Detail', ['complain' => $complain]);
    }

    public function edit($id)
    {
        $complain = $this->complainService->getRecordById($id);
        $complain->load(['client', 'assignedUser']);
        $clients = $this->clientService->getAllRecords();
        $users = $this->userService->getAllRecords();
        return Inertia::render('Modules/Complain/Edit', [
            'complain' => $complain,
            'clients' => $clients,
            'users' => $users
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'client_id' => 'nullable|exists:clients,id',
            'complainant_name' => 'required|string|max:255',
            'complainant_email' => 'nullable|email',
            'complainant_phone' => 'nullable|string|max:20',
            'priority' => 'in:low,medium,high',
            'status' => 'in:open,in_progress,resolved,closed',
            'assigned_to' => 'nullable|exists:users,id',
            'resolution_notes' => 'nullable|string',
            'source' => 'nullable|string|max:255',
        ]);

        $this->complainService->updateRecord($id, $request->all());
        return redirect('/complain')->with('success', 'Complain updated successfully');
    }

    public function destroy($id)
    {
        $this->complainService->deleteRecord($id);
        return redirect('/complain')->with('success', 'Complain deleted successfully');
    }
}