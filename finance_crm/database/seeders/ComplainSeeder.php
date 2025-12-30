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
        
        for ($i = 1; $i <= 15; $i++) {
            Complain::create([
                'title' => 'Complaint ' . $i,
                'description' => 'Description for complaint ' . $i,
                'complainant_name' => 'Complainant ' . $i,
                'complainant_email' => 'complainant' . $i . '@example.com',
                'priority' => $priorities[array_rand($priorities)],
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}