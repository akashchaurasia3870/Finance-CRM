<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Survey;

class SurveySeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['draft', 'active', 'closed'];
        
        for ($i = 1; $i <= 15; $i++) {
            Survey::create([
                'title' => 'Survey ' . $i,
                'description' => 'Description for survey ' . $i,
                'questions' => json_encode([
                    'question1' => 'What is your opinion?',
                    'question2' => 'How would you rate our service?'
                ]),
                'start_date' => now()->addDays(rand(1, 10)),
                'end_date' => now()->addDays(rand(11, 30)),
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}