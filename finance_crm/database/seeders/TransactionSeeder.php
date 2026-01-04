<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\Portfolio;
use App\Models\Product;
use App\Models\User;

class TransactionSeeder extends Seeder
{
    public function run(): void
    {
        $portfolios = Portfolio::all();
        $products = Product::all();
        $users = User::all();

        if ($portfolios->isEmpty() || $users->isEmpty()) {
            return;
        }

        foreach ($portfolios as $portfolio) {
            // Initial cash deposit
            Transaction::create([
                'portfolio_id' => $portfolio->id,
                'product_id' => null,
                'transaction_type' => 'deposit',
                'quantity' => null,
                'price' => null,
                'amount' => 100000.00,
                'fees' => 0.00,
                'net_amount' => 100000.00,
                'transaction_date' => now()->subDays(30),
                'status' => 'completed',
                'reference' => 'INIT_DEPOSIT_001',
                'notes' => 'Initial portfolio funding',
                'created_by' => $users->first()->id,
            ]);

            // Stock purchases if products exist
            if ($products->isNotEmpty()) {
                $stockProducts = $products->where('product_type', 'stock')->take(2);
                
                foreach ($stockProducts as $index => $product) {
                    $quantity = ($index + 1) * 50;
                    $price = 1500 + ($index * 500);
                    $amount = $quantity * $price;
                    $fees = $amount * 0.001; // 0.1% fees
                    
                    Transaction::create([
                        'portfolio_id' => $portfolio->id,
                        'product_id' => $product->id,
                        'transaction_type' => 'buy',
                        'quantity' => $quantity,
                        'price' => $price,
                        'amount' => $amount,
                        'fees' => $fees,
                        'net_amount' => $amount + $fees,
                        'transaction_date' => now()->subDays(25 - ($index * 5)),
                        'status' => 'completed',
                        'reference' => 'BUY_' . strtoupper($product->symbol) . '_001',
                        'notes' => 'Stock purchase - ' . $product->name,
                        'created_by' => $users->first()->id,
                    ]);
                }
            }

            // Margin usage if applicable
            if ($portfolio->margin_used > 0) {
                Transaction::create([
                    'portfolio_id' => $portfolio->id,
                    'product_id' => null,
                    'transaction_type' => 'margin_use',
                    'quantity' => null,
                    'price' => null,
                    'amount' => $portfolio->margin_used,
                    'fees' => 0.00,
                    'net_amount' => $portfolio->margin_used,
                    'transaction_date' => now()->subDays(15),
                    'status' => 'completed',
                    'reference' => 'MARGIN_USE_001',
                    'notes' => 'Margin facility utilization',
                    'created_by' => $users->first()->id,
                ]);
            }

            // Recent dividend if stock positions exist
            if ($products->isNotEmpty()) {
                $stockProduct = $products->where('product_type', 'stock')->first();
                if ($stockProduct) {
                    Transaction::create([
                        'portfolio_id' => $portfolio->id,
                        'product_id' => $stockProduct->id,
                        'transaction_type' => 'dividend',
                        'quantity' => null,
                        'price' => null,
                        'amount' => 2500.00,
                        'fees' => 0.00,
                        'net_amount' => 2500.00,
                        'transaction_date' => now()->subDays(5),
                        'status' => 'completed',
                        'reference' => 'DIV_' . strtoupper($stockProduct->symbol) . '_Q1',
                        'notes' => 'Quarterly dividend - ' . $stockProduct->name,
                        'created_by' => $users->first()->id,
                    ]);
                }
            }
        }
    }
}