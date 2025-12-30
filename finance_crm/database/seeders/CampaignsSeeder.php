<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Campaigns;

class CampaignsSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['draft', 'active', 'completed', 'cancelled'];
        
        for ($i = 1; $i <= 15; $i++) {
            Campaigns::create([
                'name' => 'Campaign ' . $i,
                'description' => 'Description for campaign ' . $i,
                'start_date' => now()->addDays(rand(-30, 30)),
                'end_date' => now()->addDays(rand(31, 90)),
                'budget' => rand(5000, 100000),
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}