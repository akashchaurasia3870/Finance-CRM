<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ForexSeeder extends Seeder
{
    public function run(): void
    {
        $pairs = ['USD/EUR', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CAD', 'EUR/GBP'];
        
        foreach ($pairs as $i => $pair) {
            Product::create([
                'name' => 'Forex ' . $pair,
                'symbol' => str_replace('/', '', $pair),
                'product_type' => 'forex',
                'description' => 'Forex pair ' . $pair,
                'sector' => 'Currency',
                'risk_level' => 'high',
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}