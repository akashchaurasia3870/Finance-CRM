<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Accounts;

class AccountsSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['active', 'inactive', 'blocked'];
        $accountTypes = ['savings', 'checking', 'investment', 'retirement', 'trading', 'margin', 'cash', 'ira', 'roth_ira'];
        
        for ($i = 1; $i <= 15; $i++) {
            Accounts::create([
                'account_no' => Accounts::generateAccountNumber(),
                'account_type' => $accountTypes[array_rand($accountTypes)],
                'balance' => rand(1000, 100000),
                'status' => $statuses[array_rand($statuses)],
                'client_id' => rand(1, 10),
                'created_by' => 1,
            ]);
        }
    }
}