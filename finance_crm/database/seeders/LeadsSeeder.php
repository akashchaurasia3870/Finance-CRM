<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Leads;

class LeadsSeeder extends Seeder
{
    public function run(): void
    {
        $sources = ['website', 'referral', 'cold_call', 'social_media', 'advertisement'];
        $campaigns = ['Summer Campaign', 'Winter Promo', 'Spring Launch', 'Holiday Special'];
        $statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
        
        for ($i = 1; $i <= 15; $i++) {
            Leads::create([
                'name' => 'Lead ' . $i,
                'email' => 'lead' . $i . '@example.com',
                'phone' => '+1987654' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'assigned_to' => rand(1, 5),
                'created_by' => 1,
                'source' => $sources[array_rand($sources)],
                'campaign' => $campaigns[array_rand($campaigns)],
                'status' => $statuses[array_rand($statuses)],
                'value' => rand(5000, 50000),
                'follow_up_date' => now()->addDays(rand(1, 30)),
                'converted_at' => rand(0, 1) ? now()->subDays(rand(1, 60)) : null,
                'notes' => 'Initial contact notes for lead ' . $i,
            ]);
        }
    }
}