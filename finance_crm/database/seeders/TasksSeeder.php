<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tasks;

class TasksSeeder extends Seeder
{
    public function run(): void
    {
        $priorities = ['low', 'medium', 'high'];
        $statuses = ['pending', 'in_progress', 'completed'];
        
        for ($i = 1; $i <= 15; $i++) {
            Tasks::create([
                'title' => 'Task ' . $i,
                'description' => 'Description for task ' . $i,
                'user_id' => 1,
                'due_date' => now()->addDays(rand(1, 30)),
                'priority' => $priorities[array_rand($priorities)],
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}