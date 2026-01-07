<?php

namespace App\Http\Controllers;

use App\Services\AccountsService;
use App\Services\ClientService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountsWebController extends Controller
{
    protected $accountsService;
    protected $clientService;

    public function __construct(AccountsService $accountsService, ClientService $clientService)
    {
        $this->accountsService = $accountsService;
        $this->clientService = $clientService;
    }

    public function index()
    {
        $accounts = collect($this->accountsService->getAllRecords())->map(function ($account) {
            $accountModel = $this->accountsService->getRecordById($account['id']);
            $accountModel->load(['client', 'creator']);
            return $accountModel->toArray();
        });
        return Inertia::render('Modules/Accounts/View', ['accounts' => $accounts]);
    }

    public function create()
    {
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Accounts/New', ['clients' => $clients]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'account_type' => 'required|in:savings,checking,investment,retirement,trading,margin,cash,ira,roth_ira',
            'balance' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,inactive,blocked',
            'client_id' => 'required|exists:clients,id',
        ]);

        $this->accountsService->createNewRecord($request->all());
        return redirect('/accounts')->with('success', 'Account created successfully');
    }

    public function show($id)
    {
        $account = $this->accountsService->getRecordById($id);
        $account->load(['client', 'creator', 'portfolios', 'transactions']);
        return Inertia::render('Modules/Accounts/Detail', ['account' => $account]);
    }

    public function edit($id)
    {
        $account = $this->accountsService->getRecordById($id);
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Accounts/Edit', ['account' => $account, 'clients' => $clients]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'account_type' => 'required|in:savings,checking,investment,retirement,trading,margin,cash,ira,roth_ira',
            'balance' => 'nullable|numeric|min:0',
            'status' => 'required|in:active,inactive,blocked',
            'client_id' => 'nullable|exists:clients,id',
        ]);

        $this->accountsService->updateRecord($id, $request->all());
        return redirect('/accounts')->with('success', 'Account updated successfully');
    }

    public function destroy($id)
    {
        $this->accountsService->deleteRecord($id);
        return redirect('/accounts')->with('success', 'Account deleted successfully');
    }
}