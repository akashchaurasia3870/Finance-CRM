<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Target;

class TargetSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 12; $i++) {
            Target::create([
                'name' => 'Target ' . $i,
                'description' => 'Target description for ' . $i,
                'target_value' => rand(10000, 100000),
                'achieved_value' => rand(5000, 80000),
                'start_date' => now()->startOfMonth(),
                'end_date' => now()->endOfMonth(),
                'assigned_to' => rand(1, 5),
                'created_by' => 1,
            ]);
        }
    }
}