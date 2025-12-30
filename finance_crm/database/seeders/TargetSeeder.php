<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Target;

class TargetSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            $target = rand(50000, 200000);
            Target::create([
                'name' => 'Target ' . $i,
                'description' => 'Description for target ' . $i,
                'target_value' => $target,
                'achieved_value' => rand(0, $target),
                'start_date' => now()->subDays(rand(30, 90)),
                'end_date' => now()->addDays(rand(30, 90)),
                'assigned_to' => 1,
            ]);
        }
    }
}