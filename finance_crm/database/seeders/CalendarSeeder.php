<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Calendar;

class CalendarSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['meeting', 'event', 'reminder'];
        
        for ($i = 1; $i <= 15; $i++) {
            Calendar::create([
                'title' => 'Event ' . $i,
                'description' => 'Description for event ' . $i,
                'start_date' => now()->addDays(rand(1, 30)),
                'end_date' => now()->addDays(rand(31, 60)),
                'type' => $types[array_rand($types)],
            ]);
        }
    }
}