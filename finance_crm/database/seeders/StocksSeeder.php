<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class StocksSeeder extends Seeder
{
    public function run(): void
    {
        $sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer'];
        $riskLevels = ['low', 'medium', 'high'];
        
        for ($i = 1; $i <= 10; $i++) {
            Product::create([
                'name' => 'Stock ' . $i,
                'symbol' => 'STK' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'product_type' => 'stock',
                'description' => 'Stock product ' . $i,
                'sector' => $sectors[array_rand($sectors)],
                'risk_level' => $riskLevels[array_rand($riskLevels)],
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}