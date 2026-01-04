<?php

namespace App\Http\Controllers;

use App\Services\PortfolioService;
use App\Services\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioWebController extends Controller
{
    protected $portfolioService;
    protected $clientService;

    public function __construct(PortfolioService $portfolioService, ClientService $clientService)
    {
        $this->portfolioService = $portfolioService;
        $this->clientService = $clientService;
    }

    public function index()
    {
        $portfolios = collect($this->portfolioService->getAllRecords())->map(function ($portfolio) {
            $portfolioModel = $this->portfolioService->getRecordById($portfolio['id']);
            $portfolioModel->load(['client', 'creator']);
            return $portfolioModel->toArray();
        });
        return Inertia::render('Modules/Portfolio/View', ['portfolios' => $portfolios]);
    }

    public function create()
    {
        $clients = $this->clientService->getActiveClients();
        return Inertia::render('Modules/Portfolio/New', ['clients' => $clients]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'portfolio_name' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
            'status' => 'required|in:active,inactive,closed',
        ]);

        $this->portfolioService->createNewRecord($request->all());
        return redirect('/portfolio')->with('success', 'Portfolio created successfully');
    }

    public function show($id)
    {
        $portfolioSummary = $this->portfolioService->getPortfolioSummary($id);
        return Inertia::render('Modules/Portfolio/Detail', $portfolioSummary);
    }

    public function edit($id)
    {
        $portfolio = $this->portfolioService->getRecordById($id);
        $clients = $this->clientService->getActiveClients();
        return Inertia::render('Modules/Portfolio/Edit', [
            'portfolio' => $portfolio,
            'clients' => $clients
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'portfolio_name' => 'required|string|max:255',
            'client_id' => 'required|exists:clients,id',
            'status' => 'required|in:active,inactive,closed',
        ]);

        $this->portfolioService->updateRecord($id, $request->all());
        return redirect('/portfolio')->with('success', 'Portfolio updated successfully');
    }

    public function destroy($id)
    {
        $this->portfolioService->deleteRecord($id);
        return redirect('/portfolio')->with('success', 'Portfolio deleted successfully');
    }
}