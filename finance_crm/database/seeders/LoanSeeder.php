<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Loan;

class LoanSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['pending', 'approved', 'disbursed', 'closed'];
        
        for ($i = 1; $i <= 15; $i++) {
            Loan::create([
                'loan_number' => 'LN' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'amount' => rand(50000, 500000),
                'interest_rate' => rand(500, 1500) / 100,
                'term_months' => rand(12, 60),
                'status' => $statuses[array_rand($statuses)],
                'client_id' => 1,
            ]);
        }
    }
}