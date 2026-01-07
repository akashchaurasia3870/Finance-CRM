<?php

namespace App\Http\Controllers;

use App\Services\SecurityPositionService;
use App\Services\PortfolioService;
use App\Services\ProductService;
use App\Services\ClientService;
use App\Services\AccountsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecurityPositionWebController extends Controller
{
    protected $securityPositionService;
    protected $portfolioService;
    protected $productService;
    protected $clientService;
    protected $accountsService;

    public function __construct(
        SecurityPositionService $securityPositionService,
        PortfolioService $portfolioService,
        ProductService $productService,
        ClientService $clientService,
        AccountsService $accountsService
    ) {
        $this->securityPositionService = $securityPositionService;
        $this->portfolioService = $portfolioService;
        $this->productService = $productService;
        $this->clientService = $clientService;
        $this->accountsService = $accountsService;
    }

    public function index()
    {
        $positions = collect($this->securityPositionService->getAllRecords())->map(function ($position) {
            $positionModel = $this->securityPositionService->getRecordById($position['id']);
            $positionModel->load(['portfolio.account.client', 'product', 'creator']);
            return $positionModel->toArray();
        });
        return Inertia::render('Modules/Position/View', ['positions' => $positions]);
    }

    public function create()
    {
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Position/New', [
            'clients' => $clients,
            'positionTypes' => [
                'stock' => 'Stock Position',
                'cash' => 'Cash Position',
                'margin' => 'Margin Position'
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'portfolio_id' => 'required|exists:portfolios,id',
            'product_id' => 'nullable|exists:products,id',
            'position_type' => 'required|in:stock,cash,margin',
            'quantity' => 'required|numeric|min:0',
            'avg_price' => 'nullable|numeric|min:0',
        ]);

        $data = $request->all();
        $data['market_value'] = $data['quantity'] * ($data['avg_price'] ?? 1);
        
        $this->securityPositionService->createNewRecord($data);
        return redirect('/position')->with('success', 'Position created successfully');
    }

    public function show($id)
    {
        $position = $this->securityPositionService->getRecordById($id);
        $position->load(['portfolio.account.client', 'product', 'creator']);
        return Inertia::render('Modules/Position/Detail', ['position' => $position]);
    }

    public function edit($id)
    {
        $position = $this->securityPositionService->getRecordById($id);
        $clients = $this->clientService->getAllRecords();
        return Inertia::render('Modules/Position/Edit', [
            'position' => $position,
            'clients' => $clients,
            'positionTypes' => [
                'stock' => 'Stock Position',
                'cash' => 'Cash Position',
                'margin' => 'Margin Position'
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'portfolio_id' => 'required|exists:portfolios,id',
            'product_id' => 'nullable|exists:products,id',
            'position_type' => 'required|in:stock,cash,margin',
            'quantity' => 'required|numeric|min:0',
            'avg_price' => 'nullable|numeric|min:0',
        ]);

        $data = $request->all();
        $data['market_value'] = $data['quantity'] * ($data['avg_price'] ?? 1);
        $data['last_updated'] = now();
        
        $this->securityPositionService->updateRecord($id, $data);
        return redirect('/position')->with('success', 'Position updated successfully');
    }

    public function destroy($id)
    {
        $this->positionService->deleteRecord($id);
        return redirect('/position')->with('success', 'Position deleted successfully');
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

    public function getProductsByType($positionType)
    {
        $products = $this->productService->getProductsByType($positionType);
        return response()->json($products);
    }
}