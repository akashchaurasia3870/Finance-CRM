<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MutualFunds;

class MutualFundsSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['equity', 'debt', 'hybrid'];
        
        for ($i = 1; $i <= 15; $i++) {
            $nav = rand(1000, 5000) / 100;
            $units = rand(100, 1000);
            
            MutualFunds::create([
                'fund_name' => 'Fund ' . $i,
                'fund_code' => 'MF' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'nav' => $nav,
                'units' => $units,
                'investment_amount' => $nav * $units,
                'fund_type' => $types[array_rand($types)],
            ]);
        }
    }
}