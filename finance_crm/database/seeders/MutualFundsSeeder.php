<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class MutualFundsSeeder extends Seeder
{
    public function run(): void
    {
        $fundTypes = ['Equity Fund', 'Debt Fund', 'Hybrid Fund', 'Index Fund', 'ELSS Fund'];
        $riskLevels = ['low', 'medium', 'high'];
        
        foreach ($fundTypes as $i => $fundType) {
            Product::create([
                'name' => $fundType . ' ' . ($i + 1),
                'symbol' => 'MF' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
                'product_type' => 'mutual_fund',
                'description' => $fundType . ' mutual fund product',
                'sector' => 'Mutual Funds',
                'risk_level' => $riskLevels[array_rand($riskLevels)],
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}