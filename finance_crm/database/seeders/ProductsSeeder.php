<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        $productTypes = ['stock', 'mutual_fund', 'etf', 'bond', 'derivative', 'margin', 'commodity', 'forex', 'crypto'];
        $sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Industrial', 'Real Estate', 'Utilities'];
        $riskLevels = ['low', 'medium', 'high', 'very_high'];
        
        for ($i = 1; $i <= 20; $i++) {
            Product::create([
                'name' => 'Product ' . $i,
                'symbol' => 'PRD' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'product_type' => $productTypes[array_rand($productTypes)],
                'description' => 'Description for product ' . $i,
                'sector' => $sectors[array_rand($sectors)],
                'risk_level' => $riskLevels[array_rand($riskLevels)],
                'is_active' => rand(0, 1) ? true : false,
                'created_by' => 1,
            ]);
        }
    }
}