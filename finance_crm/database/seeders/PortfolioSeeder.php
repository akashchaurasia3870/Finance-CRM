<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Portfolio;
use App\Models\Client;
use App\Models\User;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $clients = Client::all();
        $users = User::all();

        if ($clients->isEmpty() || $users->isEmpty()) {
            return;
        }

        $portfolios = [
            [
                'portfolio_name' => 'Retirement Portfolio',
                'portfolio_no' => 'PF202400001',
                'client_id' => $clients->first()->id,
                'total_value' => 350000.00,
                'cash_balance' => 40000.00,
                'margin_used' => 10000.00,
                'status' => 'active',
                'created_by' => $users->first()->id,
            ],
            [
                'portfolio_name' => 'Growth Portfolio',
                'portfolio_no' => 'PF202400002',
                'client_id' => $clients->skip(1)->first()->id ?? $clients->first()->id,
                'total_value' => 150000.00,
                'cash_balance' => 25000.00,
                'margin_used' => 5000.00,
                'status' => 'active',
                'created_by' => $users->first()->id,
            ],
            [
                'portfolio_name' => 'Conservative Portfolio',
                'portfolio_no' => 'PF202400003',
                'client_id' => $clients->skip(2)->first()->id ?? $clients->first()->id,
                'total_value' => 75000.00,
                'cash_balance' => 15000.00,
                'margin_used' => 0.00,
                'status' => 'active',
                'created_by' => $users->first()->id,
            ],
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::create($portfolio);
        }
    }
}