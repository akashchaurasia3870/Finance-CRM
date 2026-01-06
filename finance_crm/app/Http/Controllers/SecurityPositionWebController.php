<?php

namespace App\Http\Controllers;

use App\Services\PositionService;
use App\Services\PortfolioService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SecurityPositionWebController extends Controller
{
    protected $positionService;
    protected $portfolioService;
    protected $productService;

    public function __construct(
        PositionService $positionService,
        PortfolioService $portfolioService,
        ProductService $productService
    ) {
        $this->positionService = $positionService;
        $this->portfolioService = $portfolioService;
        $this->productService = $productService;
    }

    public function index()
    {
        $positions = collect($this->positionService->getAllRecords())->map(function ($position) {
            $positionModel = $this->positionService->getRecordById($position['id']);
            $positionModel->load(['portfolio.client', 'product', 'creator']);
            return $positionModel->toArray();
        });
        return Inertia::render('Modules/Position/View', ['positions' => $positions]);
    }

    public function create()
    {
        $portfolios = $this->portfolioService->getActivePortfolios();
        $products = $this->productService->getActiveProducts();
        return Inertia::render('Modules/Position/New', [
            'portfolios' => $portfolios,
            'products' => $products,
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
        
        $this->positionService->createNewRecord($data);
        return redirect('/position')->with('success', 'Position created successfully');
    }

    public function show($id)
    {
        $position = $this->positionService->getRecordById($id);
        $position->load(['portfolio.client', 'product', 'creator']);
        return Inertia::render('Modules/Position/Detail', ['position' => $position]);
    }

    public function edit($id)
    {
        $position = $this->positionService->getRecordById($id);
        $portfolios = $this->portfolioService->getActivePortfolios();
        $products = $this->productService->getActiveProducts();
        return Inertia::render('Modules/Position/Edit', [
            'position' => $position,
            'portfolios' => $portfolios,
            'products' => $products,
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
        
        $this->positionService->updateRecord($id, $data);
        return redirect('/position')->with('success', 'Position updated successfully');
    }

    public function destroy($id)
    {
        $this->positionService->deleteRecord($id);
        return redirect('/position')->with('success', 'Position deleted successfully');
    }
}