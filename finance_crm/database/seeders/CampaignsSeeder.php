<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Campaigns;
use App\Models\User;

class CampaignsSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled'];
        $types = ['email', 'sms', 'whatsapp', 'manual'];
        $users = User::limit(3)->get();
        
        $campaignNames = [
            'Summer Sale Campaign',
            'New Product Launch',
            'Customer Retention Drive',
            'Holiday Special Offers',
            'Welcome Series Campaign',
            'Re-engagement Campaign',
            'Black Friday Promotion',
            'Newsletter Campaign',
            'Loyalty Program Launch',
            'Feedback Collection Drive'
        ];
        
        foreach ($campaignNames as $index => $name) {
            $startDate = now()->addDays(rand(-60, 30));
            $endDate = $startDate->copy()->addDays(rand(7, 60));
            
            Campaigns::create([
                'name' => $name,
                'description' => 'Detailed description for ' . $name . '. This campaign aims to achieve specific marketing objectives and engage our target audience effectively.',
                'start_date' => $startDate,
                'end_date' => $endDate,
                'budget' => rand(1000, 50000),
                'type' => $types[array_rand($types)],
                'status' => $statuses[array_rand($statuses)],
                'created_by' => $users->isNotEmpty() ? $users->random()->id : null,
                'created_at' => now()->subDays(rand(1, 90)),
                'updated_at' => now()->subDays(rand(0, 30)),
            ]);
        }
    }
}