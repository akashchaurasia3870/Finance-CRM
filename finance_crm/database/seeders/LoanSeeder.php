<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class LoanSeeder extends Seeder
{
    public function run(): void
    {
        $loanTypes = ['Personal Loan', 'Home Loan', 'Car Loan', 'Business Loan', 'Education Loan'];
        
        foreach ($loanTypes as $i => $loanType) {
            Product::create([
                'name' => $loanType,
                'symbol' => 'LOAN' . str_pad($i + 1, 2, '0', STR_PAD_LEFT),
                'product_type' => 'derivative',
                'description' => $loanType . ' product',
                'sector' => 'Lending',
                'risk_level' => 'medium',
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}