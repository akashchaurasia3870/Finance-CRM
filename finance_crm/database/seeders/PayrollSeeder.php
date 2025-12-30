<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payroll;

class PayrollSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            $basic = rand(30000, 100000);
            $allowances = rand(5000, 20000);
            $deductions = rand(2000, 10000);
            
            Payroll::create([
                'user_id' => 1,
                'basic_salary' => $basic,
                'allowances' => $allowances,
                'deductions' => $deductions,
                'net_salary' => $basic + $allowances - $deductions,
                'pay_date' => now()->subMonths($i),
                'pay_period' => now()->subMonths($i)->format('Y-m'),
            ]);
        }
    }
}