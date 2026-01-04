<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Complain;

class ComplainSeeder extends Seeder
{
    public function run(): void
    {
        $priorities = ['low', 'medium', 'high'];
        $statuses = ['open', 'in_progress', 'resolved', 'closed'];
        $sources = ['email', 'phone', 'website', 'in_person'];
        
        for ($i = 1; $i <= 12; $i++) {
            Complain::create([
                'title' => 'Complaint ' . $i,
                'description' => 'Description for complaint ' . $i . '. Customer issue details.',
                'client_id' => rand(1, 12),
                'complainant_name' => 'Complainant ' . $i,
                'complainant_email' => 'complainant' . $i . '@example.com',
                'complainant_phone' => '+1555000' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'priority' => $priorities[array_rand($priorities)],
                'status' => $statuses[array_rand($statuses)],
                'assigned_to' => rand(1, 5),
                'resolved_at' => rand(0, 1) ? now()->subDays(rand(1, 15)) : null,
                'resolution_notes' => rand(0, 1) ? 'Resolution notes for complaint ' . $i : null,
                'source' => $sources[array_rand($sources)],
                'created_by' => 1,
            ]);
        }
    }
}