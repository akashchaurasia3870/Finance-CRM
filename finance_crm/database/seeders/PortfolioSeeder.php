<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $risks = ['low', 'medium', 'high'];
        
        for ($i = 1; $i <= 15; $i++) {
            Portfolio::create([
                'name' => 'Portfolio ' . $i,
                'description' => 'Description for portfolio ' . $i,
                'client_id' => 1,
                'total_value' => rand(50000, 500000),
                'risk_level' => $risks[array_rand($risks)],
            ]);
        }
    }
}