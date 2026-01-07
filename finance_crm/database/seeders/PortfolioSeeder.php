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
        $accounts = \App\Models\Accounts::all();
        $users = User::all();

        if ($accounts->isEmpty() || $users->isEmpty()) {
            return;
        }

        $portfolioTypes = [
            'cash_portfolio',
            'stock_portfolio', 
            'bond_portfolio',
            'mutual_fund_portfolio',
            'etf_portfolio'
        ];

        foreach ($portfolioTypes as $index => $type) {
            $account = $accounts->skip($index % $accounts->count())->first();
            Portfolio::create([
                'portfolio_name' => $type,
                'portfolio_no' => Portfolio::PORTFOLIO_TYPES[$type]['number'],
                'account_id' => $account->id,
                'client_id' => $account->client_id,
                'status' => 'active',
                'created_by' => $users->first()->id,
            ]);
        }
    }
}