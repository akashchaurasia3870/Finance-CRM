<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Position;

class SecurityPositionSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            $quantity = rand(10, 1000);
            $avgPrice = rand(50, 500);
            
            Position::create([
                'portfolio_id' => rand(1, 20),
                'product_id' => rand(1, 20),
                'position_type' => ['stock', 'cash', 'margin'][rand(0, 2)],
                'quantity' => $quantity,
                'avg_price' => $avgPrice,
                'market_value' => $quantity * $avgPrice,
                'last_updated' => now()->subDays(rand(0, 30)),
                'created_by' => 1,
            ]);
        }
    }
}