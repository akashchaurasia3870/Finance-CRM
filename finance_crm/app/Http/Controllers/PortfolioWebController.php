<?php

namespace App\Http\Controllers;

use App\Services\PortfolioService;
use App\Services\ClientService;
use App\Services\AccountsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioWebController extends Controller
{
    protected $portfolioService;
    protected $clientService;
    protected $accountsService;

    public function __construct(PortfolioService $portfolioService, ClientService $clientService, AccountsService $accountsService)
    {
        $this->portfolioService = $portfolioService;
        $this->clientService = $clientService;
        $this->accountsService = $accountsService;
    }

    public function index()
    {
        $portfolios = collect($this->portfolioService->getAllRecords())->map(function ($portfolio) {
            $portfolioModel = $this->portfolioService->getRecordById($portfolio['id']);
            $portfolioModel->load(['account', 'creator']);
            return $portfolioModel->toArray();
        });
        return Inertia::render('Modules/Portfolio/View', ['portfolios' => $portfolios]);
    }

    public function create()
    {
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Portfolio/New', ['clients' => $clients]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'portfolio_name' => 'required|in:cash_portfolio,stock_portfolio,bond_portfolio,mutual_fund_portfolio,etf_portfolio,retirement_portfolio,margin_portfolio,options_portfolio,forex_portfolio,crypto_portfolio',
            'client_id' => 'required|exists:clients,id',
            'account_id' => 'required|exists:accounts,id',
            'status' => 'required|in:active,inactive',
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
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Portfolio/Edit', [
            'portfolio' => $portfolio,
            'clients' => $clients
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'portfolio_name' => 'required|in:cash_portfolio,stock_portfolio,bond_portfolio,mutual_fund_portfolio,etf_portfolio,retirement_portfolio,margin_portfolio,options_portfolio,forex_portfolio,crypto_portfolio',
            'client_id' => 'nullable|exists:clients,id',
            'account_id' => 'nullable|exists:accounts,id',
            'status' => 'required|in:active,inactive',
        ]);

        $this->portfolioService->updateRecord($id, $request->all());
        return redirect('/portfolio')->with('success', 'Portfolio updated successfully');
    }

    public function destroy($id)
    {
        $this->portfolioService->deleteRecord($id);
        return redirect('/portfolio')->with('success', 'Portfolio deleted successfully');
    }

    public function getAccountsByClient($clientId)
    {
        $accounts = $this->accountsService->getAccountsByClient($clientId);
        return response()->json($accounts);
    }
}