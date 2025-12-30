<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Forex;

class ForexSeeder extends Seeder
{
    public function run(): void
    {
        $pairs = ['USD/EUR', 'USD/GBP', 'USD/JPY', 'EUR/GBP', 'GBP/JPY'];
        $types = ['buy', 'sell'];
        
        for ($i = 1; $i <= 15; $i++) {
            Forex::create([
                'currency_pair' => $pairs[array_rand($pairs)],
                'exchange_rate' => rand(100000, 200000) / 100000,
                'amount' => rand(1000, 50000),
                'transaction_type' => $types[array_rand($types)],
                'transaction_date' => now()->subDays(rand(1, 30)),
            ]);
        }
    }
}