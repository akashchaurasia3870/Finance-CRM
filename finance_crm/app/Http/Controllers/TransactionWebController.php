<?php

namespace App\Http\Controllers;

use App\Services\TransactionService;
use App\Services\PortfolioService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionWebController extends Controller
{
    protected $transactionService;
    protected $portfolioService;
    protected $productService;

    public function __construct(
        TransactionService $transactionService,
        PortfolioService $portfolioService,
        ProductService $productService
    ) {
        $this->transactionService = $transactionService;
        $this->portfolioService = $portfolioService;
        $this->productService = $productService;
    }

    public function index()
    {
        $transactions = collect($this->transactionService->getAllRecords())->map(function ($transaction) {
            $transactionModel = $this->transactionService->getRecordById($transaction['id']);
            $transactionModel->load(['portfolio.client', 'product', 'creator']);
            return $transactionModel->toArray();
        });
        return Inertia::render('Modules/Transaction/View', ['transactions' => $transactions]);
    }

    public function create()
    {
        $portfolios = $this->portfolioService->getActivePortfolios();
        $products = $this->productService->getActiveProducts();
        return Inertia::render('Modules/Transaction/New', [
            'portfolios' => $portfolios,
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

    public function store(Request $request)
    {
        $request->validate([
            'portfolio_id' => 'required|exists:portfolios,id',
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
        $transaction->load(['portfolio.client', 'product', 'creator']);
        return Inertia::render('Modules/Transaction/Detail', ['transaction' => $transaction]);
    }

    public function edit($id)
    {
        $transaction = $this->transactionService->getRecordById($id);
        $portfolios = $this->portfolioService->getActivePortfolios();
        $products = $this->productService->getActiveProducts();
        return Inertia::render('Modules/Transaction/Edit', [
            'transaction' => $transaction,
            'portfolios' => $portfolios,
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
            'portfolio_id' => 'required|exists:portfolios,id',
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