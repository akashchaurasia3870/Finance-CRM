<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Leads;

class LeadsSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
        $sources = ['website', 'referral', 'social_media', 'email', 'phone'];
        
        for ($i = 1; $i <= 15; $i++) {
            Leads::create([
                'name' => 'Lead ' . $i,
                'email' => 'lead' . $i . '@example.com',
                'phone' => '777-' . str_pad($i, 3, '0', STR_PAD_LEFT) . '-' . rand(1000, 9999),
                'source' => $sources[array_rand($sources)],
                'status' => $statuses[array_rand($statuses)],
                'value' => rand(1000, 25000),
            ]);
        }
    }
}