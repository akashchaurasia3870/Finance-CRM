<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductWebController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        $products = $this->productService->getAllRecords();
        return Inertia::render('Modules/Product/View', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('Modules/Product/New');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'symbol' => 'nullable|string|max:50',
            'product_type' => 'required|in:stock,mutual_fund,etf,bond,derivative,margin,commodity,forex,crypto',
            'description' => 'nullable|string',
            'sector' => 'nullable|string|max:255',
            'risk_level' => 'required|in:low,medium,high,very_high',
            'is_active' => 'boolean',
        ]);

        $this->productService->createNewRecord($request->all());
        return redirect('/product')->with('success', 'Product created successfully');
    }

    public function show($id)
    {
        $product = $this->productService->getRecordById($id);
        $product->load(['creator', 'securityPositions', 'transactions']);
        return Inertia::render('Modules/Product/Detail', ['product' => $product]);
    }

    public function edit($id)
    {
        $product = $this->productService->getRecordById($id);
        return Inertia::render('Modules/Product/Edit', ['product' => $product]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'symbol' => 'nullable|string|max:50',
            'product_type' => 'required|in:stock,mutual_fund,etf,bond,derivative,margin,commodity,forex,crypto',
            'description' => 'nullable|string',
            'sector' => 'nullable|string|max:255',
            'risk_level' => 'required|in:low,medium,high,very_high',
            'is_active' => 'boolean',
        ]);

        $this->productService->updateRecord($id, $request->all());
        return redirect('/product')->with('success', 'Product updated successfully');
    }

    public function destroy($id)
    {
        $this->productService->deleteRecord($id);
        return redirect('/product')->with('success', 'Product deleted successfully');
    }
}