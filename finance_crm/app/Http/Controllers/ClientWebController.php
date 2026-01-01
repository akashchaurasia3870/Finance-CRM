<?php

namespace App\Http\Controllers;

use App\Services\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientWebController extends Controller
{
    protected $clientService;

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    public function index()
    {
        $clients = collect($this->clientService->getAllRecords())->map(function ($client) {
            $clientModel = $this->clientService->getRecordById($client['id']);
            $clientModel->load(['creator']);
            return $clientModel->toArray();
        });
        return Inertia::render('Modules/Client/View', ['clients' => $clients]);
    }

    public function create()
    {
        return Inertia::render('Modules/Client/New');
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:clients,email',
                'phone' => 'nullable|string|max:20',
                'company' => 'nullable|string|max:255',
                'address' => 'nullable|string',
                'status' => 'nullable|in:active,inactive',
            ]);

            $this->clientService->createNewRecord($request->all());
            return redirect('/client')->with('success', 'Client created successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create client: ' . $e->getMessage()])->withInput();
        }
    }

    public function show($id)
    {
        $client = $this->clientService->getRecordById($id);
        $client->load(['creator']);
        return Inertia::render('Modules/Client/Detail', ['client' => $client]);
    }

    public function edit($id)
    {
        $client = $this->clientService->getRecordById($id);
        return Inertia::render('Modules/Client/Edit', ['client' => $client]);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:clients,email,' . $id,
                'phone' => 'nullable|string|max:20',
                'company' => 'nullable|string|max:255',
                'address' => 'nullable|string',
                'status' => 'nullable|in:active,inactive',
            ]);

            $this->clientService->updateRecord($id, $request->all());
            return redirect('/client')->with('success', 'Client updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update client: ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $this->clientService->deleteRecord($id);
            return redirect('/client')->with('success', 'Client deleted successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete client: ' . $e->getMessage()]);
        }
    }
}