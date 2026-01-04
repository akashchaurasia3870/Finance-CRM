<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class BondsSeeder extends Seeder
{
    public function run(): void
    {
        $sectors = ['Government', 'Corporate', 'Municipal'];
        
        for ($i = 1; $i <= 8; $i++) {
            Product::create([
                'name' => 'Bond ' . $i,
                'symbol' => 'BND' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'product_type' => 'bond',
                'description' => 'Bond product ' . $i,
                'sector' => $sectors[array_rand($sectors)],
                'risk_level' => 'low',
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}