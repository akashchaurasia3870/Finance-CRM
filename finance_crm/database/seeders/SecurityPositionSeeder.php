<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SecurityPosition;
use App\Models\Portfolio;
use App\Models\Product;
use App\Models\User;

class SecurityPositionSeeder extends Seeder
{
    public function run(): void
    {
        $portfolios = Portfolio::all();
        $products = Product::all();
        $users = User::all();
        
        if ($portfolios->isEmpty() || $products->isEmpty() || $users->isEmpty()) {
            return;
        }
        
        foreach ($portfolios as $portfolio) {
            // Create cash position
            SecurityPosition::create([
                'portfolio_id' => $portfolio->id,
                'product_id' => null,
                'position_type' => 'cash',
                'quantity' => rand(1000, 50000),
                'avg_price' => 1,
                'market_value' => rand(1000, 50000),
                'created_by' => $users->first()->id,
            ]);
            
            // Create 1-3 stock positions
            $stockCount = rand(1, 3);
            for ($i = 0; $i < $stockCount; $i++) {
                $quantity = rand(10, 1000);
                $avgPrice = rand(50, 500);
                
                SecurityPosition::create([
                    'portfolio_id' => $portfolio->id,
                    'product_id' => $products->random()->id,
                    'position_type' => 'stock',
                    'quantity' => $quantity,
                    'avg_price' => $avgPrice,
                    'market_value' => $quantity * $avgPrice,
                    'created_by' => $users->first()->id,
                ]);
            }
        }
    }
}