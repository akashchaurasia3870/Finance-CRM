<?php

namespace App\Http\Controllers;

use App\Services\CampaignsService;
use App\Services\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CampaignsWebController extends Controller
{
    protected $campaignsService;
    protected $clientService;

    public function __construct(CampaignsService $campaignsService, ClientService $clientService)
    {
        $this->campaignsService = $campaignsService;
        $this->clientService = $clientService;
    }

    public function index()
    {
        $campaigns = collect($this->campaignsService->getAllRecords())->map(function ($campaign) {
            $campaignModel = $this->campaignsService->getRecordById($campaign['id']);
            $campaignModel->load(['creator', 'clients']);
            return $campaignModel->toArray();
        });
        return Inertia::render('Modules/Campaigns/View', ['campaigns' => $campaigns]);
    }

    public function create()
    {
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Campaigns/New', ['clients' => $clients]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'type' => 'in:email,sms,whatsapp,manual',
            'status' => 'in:draft,scheduled,active,paused,completed,cancelled',
            'clients' => 'array',
            'clients.*' => 'exists:clients,id',
        ]);

        $this->campaignsService->createNewRecord($request->all());
        return redirect('/campaigns')->with('success', 'Campaign created successfully');
    }

    public function show($id)
    {
        $campaign = $this->campaignsService->getRecordById($id);
        $campaign->load(['creator', 'clients']);
        return Inertia::render('Modules/Campaigns/Detail', ['campaign' => $campaign]);
    }

    public function edit($id)
    {
        $campaign = $this->campaignsService->getRecordById($id);
        $campaign->load('clients');
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Campaigns/Edit', [
            'campaign' => $campaign,
            'clients' => $clients
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'budget' => 'nullable|numeric|min:0',
            'type' => 'in:email,sms,whatsapp,manual',
            'status' => 'in:draft,scheduled,active,paused,completed,cancelled',
            'clients' => 'array',
            'clients.*' => 'exists:clients,id',
        ]);

        $this->campaignsService->updateRecord($id, $request->all());
        return redirect('/campaigns')->with('success', 'Campaign updated successfully');
    }

    public function destroy($id)
    {
        $this->campaignsService->deleteRecord($id);
        return redirect('/campaigns')->with('success', 'Campaign deleted successfully');
    }
}