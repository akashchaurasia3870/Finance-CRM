<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Survey;

class SurveySeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['draft', 'active', 'paused', 'closed'];
        
        for ($i = 1; $i <= 8; $i++) {
            Survey::create([
                'title' => 'Survey ' . $i,
                'description' => 'Survey description for ' . $i,
                'start_date' => now()->subDays(rand(0, 30)),
                'end_date' => now()->addDays(rand(1, 60)),
                'status' => $statuses[array_rand($statuses)],
                'created_by' => 1,
            ]);
        }
    }
}