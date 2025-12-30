<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Position;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $departments = ['IT', 'Finance', 'HR', 'Sales', 'Marketing'];
        $statuses = ['open', 'closed', 'filled'];
        
        for ($i = 1; $i <= 15; $i++) {
            Position::create([
                'title' => 'Position ' . $i,
                'description' => 'Description for position ' . $i,
                'department' => $departments[array_rand($departments)],
                'salary_min' => rand(30000, 60000),
                'salary_max' => rand(60000, 120000),
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}