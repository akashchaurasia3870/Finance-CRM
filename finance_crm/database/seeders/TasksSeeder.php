<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tasks;

class TasksSeeder extends Seeder
{
    public function run(): void
    {
        $priorities = ['low', 'medium', 'high'];
        $statuses = ['pending', 'in_progress', 'completed', 'cancelled'];
        $entityTypes = ['client', 'lead', 'campaign'];
        
        for ($i = 1; $i <= 12; $i++) {
            $entityType = $entityTypes[array_rand($entityTypes)];
            $entityId = $entityType === 'client' ? rand(1, 12) : ($entityType === 'lead' ? rand(1, 15) : rand(1, 10));
            
            Tasks::create([
                'title' => 'Task ' . $i,
                'description' => 'Description for task ' . $i,
                'assigned_to' => rand(1, 5),
                'created_by' => 1,
                'entity_type' => $entityType,
                'entity_id' => $entityId,
                'start_date' => now()->addDays(rand(-5, 5)),
                'due_date' => now()->addDays(rand(1, 30)),
                'completed_at' => rand(0, 1) ? now()->subDays(rand(1, 10)) : null,
                'priority' => $priorities[array_rand($priorities)],
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}