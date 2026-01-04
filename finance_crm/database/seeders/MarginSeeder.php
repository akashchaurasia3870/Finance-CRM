<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class MarginSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 6; $i++) {
            Product::create([
                'name' => 'Margin Product ' . $i,
                'symbol' => 'MRG' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'product_type' => 'margin',
                'description' => 'Margin trading product ' . $i,
                'sector' => 'Trading',
                'risk_level' => 'very_high',
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}