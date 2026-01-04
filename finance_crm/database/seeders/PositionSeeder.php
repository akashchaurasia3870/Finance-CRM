<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Position;
use App\Models\Portfolio;
use App\Models\Product;
use App\Models\User;

class PositionSeeder extends Seeder
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
            // Create cash position
            Position::create([
                'portfolio_id' => $portfolio->id,
                'product_id' => null,
                'position_type' => 'cash',
                'quantity' => $portfolio->cash_balance,
                'avg_price' => 1.00,
                'current_value' => $portfolio->cash_balance,
                'unrealized_pnl' => 0.00,
                'created_by' => $users->first()->id,
            ]);

            // Create margin position if margin is used
            if ($portfolio->margin_used > 0) {
                Position::create([
                    'portfolio_id' => $portfolio->id,
                    'product_id' => null,
                    'position_type' => 'margin',
                    'quantity' => $portfolio->margin_used,
                    'avg_price' => 1.00,
                    'current_value' => $portfolio->margin_used,
                    'unrealized_pnl' => 0.00,
                    'created_by' => $users->first()->id,
                ]);
            }

            // Create stock positions if products exist
            if ($products->isNotEmpty()) {
                $stockProducts = $products->where('product_type', 'stock')->take(2);
                
                foreach ($stockProducts as $index => $product) {
                    $quantity = ($index + 1) * 50;
                    $avgPrice = 1500 + ($index * 500);
                    
                    Position::create([
                        'portfolio_id' => $portfolio->id,
                        'product_id' => $product->id,
                        'position_type' => 'stock',
                        'quantity' => $quantity,
                        'avg_price' => $avgPrice,
                        'current_value' => $quantity * $avgPrice,
                        'unrealized_pnl' => 0.00,
                        'created_by' => $users->first()->id,
                    ]);
                }
            }
        }
    }
}