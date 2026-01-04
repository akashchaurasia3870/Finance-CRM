<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payroll;

class PayrollSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['generated', 'approved', 'paid', 'locked'];
        
        for ($userId = 1; $userId <= 5; $userId++) {
            for ($month = 1; $month <= 2; $month++) {
                $payPeriod = now()->subMonths($month)->format('Y-m');
                
                Payroll::updateOrCreate(
                    [
                        'user_id' => $userId,
                        'pay_period' => $payPeriod,
                    ],
                    [
                        'payroll_cycle_id' => rand(1, 3),
                        'period_start' => now()->subMonths($month)->startOfMonth(),
                        'period_end' => now()->subMonths($month)->endOfMonth(),
                        'pay_date' => now()->subMonths($month)->addDays(5),
                        'gross_salary' => rand(50000, 150000),
                        'total_earnings' => rand(55000, 160000),
                        'total_deductions' => rand(5000, 15000),
                        'net_salary' => rand(45000, 145000),
                        'working_days' => 22,
                        'present_days' => rand(18, 22),
                        'leave_days' => rand(0, 4),
                        'lop_days' => rand(0, 2),
                        'status' => $statuses[array_rand($statuses)],
                        'generated_at' => now()->subDays(rand(1, 10)),
                        'approved_by' => rand(0, 1) ? rand(1, 3) : null,
                        'approved_at' => rand(0, 1) ? now()->subDays(rand(1, 5)) : null,
                        'paid_at' => rand(0, 1) ? now()->subDays(rand(1, 3)) : null,
                        'created_by' => 1,
                    ]
                );
            }
        }
    }
}