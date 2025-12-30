<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Stock;

class StocksSeeder extends Seeder
{
    public function run(): void
    {
        $stocks = [
            ['AAPL', 'Apple Inc.'], ['GOOGL', 'Alphabet Inc.'], ['MSFT', 'Microsoft Corp.'],
            ['AMZN', 'Amazon.com Inc.'], ['TSLA', 'Tesla Inc.'], ['META', 'Meta Platforms'],
            ['NVDA', 'NVIDIA Corp.'], ['NFLX', 'Netflix Inc.'], ['AMD', 'Advanced Micro Devices'],
            ['INTC', 'Intel Corp.'], ['ORCL', 'Oracle Corp.'], ['CRM', 'Salesforce Inc.'],
            ['ADBE', 'Adobe Inc.'], ['PYPL', 'PayPal Holdings'], ['UBER', 'Uber Technologies']
        ];
        
        foreach ($stocks as $stock) {
            Stock::create([
                'symbol' => $stock[0],
                'name' => $stock[1],
                'price' => rand(50, 500),
                'quantity' => rand(10, 1000),
                'market_value' => rand(1000, 100000),
            ]);
        }
    }
}