<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Campaigns;

class CampaignsSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['email', 'sms', 'whatsapp', 'manual'];
        $statuses = ['draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled'];
        
        for ($i = 1; $i <= 10; $i++) {
            Campaigns::create([
                'name' => 'Campaign ' . $i,
                'description' => 'Marketing campaign description for ' . $i,
                'start_date' => now()->subDays(rand(0, 60)),
                'end_date' => now()->addDays(rand(1, 90)),
                'budget' => rand(5000, 50000),
                'type' => $types[array_rand($types)],
                'status' => $statuses[array_rand($statuses)],
                'created_by' => 1,
            ]);
        }
    }
}