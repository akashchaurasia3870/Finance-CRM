<?php

namespace App\Http\Controllers;

use App\Services\TransactionService;
use App\Services\ClientService;
use App\Services\AccountsService;
use App\Services\PortfolioService;
use App\Services\SecurityPositionService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionWebController extends Controller
{
    protected $transactionService;
    protected $clientService;
    protected $accountsService;
    protected $portfolioService;
    protected $securityPositionService;
    protected $productService;

    public function __construct(
        TransactionService $transactionService,
        ClientService $clientService,
        AccountsService $accountsService,
        PortfolioService $portfolioService,
        SecurityPositionService $securityPositionService,
        ProductService $productService
    ) {
        $this->transactionService = $transactionService;
        $this->clientService = $clientService;
        $this->accountsService = $accountsService;
        $this->portfolioService = $portfolioService;
        $this->securityPositionService = $securityPositionService;
        $this->productService = $productService;
    }

    public function index()
    {
        $transactions = collect($this->transactionService->getAllRecords())->map(function ($transaction) {
            $transactionModel = $this->transactionService->getRecordById($transaction['id']);
            $transactionModel->load(['portfolio.account.client', 'product', 'creator']);
            return $transactionModel->toArray();
        });
        return Inertia::render('Modules/Transaction/View', ['transactions' => $transactions]);
    }

    public function create()
    {
        $clients = $this->clientService->getActiveClients();
        return Inertia::render('Modules/Transaction/New', [
            'clients' => $clients,
            'transactionTypes' => [
                'buy' => 'Buy Stock',
                'sell' => 'Sell Stock',
                'deposit' => 'Cash Deposit',
                'withdraw' => 'Cash Withdrawal',
                'margin_use' => 'Use Margin',
                'margin_repay' => 'Repay Margin',
                'dividend' => 'Dividend Received'
            ]
        ]);
    }

    public function getAccountsByClient($clientId)
    {
        $accounts = $this->accountsService->getAccountsByClient($clientId);
        return response()->json($accounts);
    }

    public function getPortfoliosByAccount($accountId)
    {
        $portfolios = $this->portfolioService->getPortfoliosByAccount($accountId);
        return response()->json($portfolios);
    }

    public function getPositionsByPortfolio($portfolioId)
    {
        $positions = $this->securityPositionService->getPositionsByPortfolio($portfolioId);
        $products = $this->productService->getActiveProducts();
        return response()->json([
            'positions' => $positions,
            'products' => $products
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'account_id' => 'required|exists:accounts,id',
            'portfolio_id' => 'required|exists:portfolios,id',
            'position_id' => 'nullable|exists:security_positions,id',
            'product_id' => 'nullable|exists:products,id',
            'transaction_type' => 'required|in:buy,sell,deposit,withdraw,margin_use,margin_repay,dividend',
            'quantity' => 'nullable|numeric|min:0',
            'price' => 'nullable|numeric|min:0',
            'amount' => 'required|numeric',
            'fees' => 'nullable|numeric|min:0',
            'transaction_date' => 'nullable|date',
            'reference' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $this->transactionService->createNewRecord($request->all());
        return redirect('/transaction')->with('success', 'Transaction processed successfully');
    }

    public function show($id)
    {
        $transaction = $this->transactionService->getRecordById($id);
        $transaction->load(['portfolio.account.client', 'product', 'creator']);
        return Inertia::render('Modules/Transaction/Detail', ['transaction' => $transaction]);
    }

    public function edit($id)
    {
        $transaction = $this->transactionService->getRecordById($id);
        $transaction->load(['portfolio.account.client', 'product']);
        
        $clients = $this->clientService->getActiveClients();
        $accounts = $this->accountsService->getAccountsByClient($transaction->portfolio->account->client_id);
        $portfolios = $this->portfolioService->getPortfoliosByAccount($transaction->portfolio->account_id);
        $positions = $this->securityPositionService->getPositionsByPortfolio($transaction->portfolio_id);
        $products = $this->productService->getActiveProducts();
        
        return Inertia::render('Modules/Transaction/Edit', [
            'transaction' => $transaction,
            'clients' => $clients,
            'accounts' => $accounts,
            'portfolios' => $portfolios,
            'positions' => $positions,
            'products' => $products,
            'transactionTypes' => [
                'buy' => 'Buy Stock',
                'sell' => 'Sell Stock',
                'deposit' => 'Cash Deposit',
                'withdraw' => 'Cash Withdrawal',
                'margin_use' => 'Use Margin',
                'margin_repay' => 'Repay Margin',
                'dividend' => 'Dividend Received'
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'account_id' => 'required|exists:accounts,id',
            'portfolio_id' => 'required|exists:portfolios,id',
            'position_id' => 'nullable|exists:security_positions,id',
            'product_id' => 'nullable|exists:products,id',
            'transaction_type' => 'required|in:buy,sell,deposit,withdraw,margin_use,margin_repay,dividend',
            'quantity' => 'nullable|numeric|min:0',
            'price' => 'nullable|numeric|min:0',
            'amount' => 'required|numeric',
            'fees' => 'nullable|numeric|min:0',
            'transaction_date' => 'nullable|date',
            'reference' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $this->transactionService->updateRecord($id, $request->all());
        return redirect('/transaction')->with('success', 'Transaction updated successfully');
    }

    public function destroy($id)
    {
        $this->transactionService->deleteRecord($id);
        return redirect('/transaction')->with('success', 'Transaction deleted successfully');
    }
}