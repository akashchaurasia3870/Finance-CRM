<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Calendar;

class CalendarSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['meeting', 'event', 'reminder', 'task', 'note'];
        $statuses = ['scheduled', 'completed', 'cancelled'];
        
        for ($i = 1; $i <= 12; $i++) {
            $startDateTime = now()->addDays(rand(-30, 30))->addHours(rand(9, 17));
            
            Calendar::create([
                'title' => 'Calendar Event ' . $i,
                'description' => 'Description for calendar event ' . $i,
                'start_datetime' => $startDateTime,
                'end_datetime' => $startDateTime->copy()->addHours(rand(1, 3)),
                'type' => $types[array_rand($types)],
                'created_by' => rand(1, 5),
                'location' => 'Location ' . $i,
                'meeting_link' => 'https://meet.example.com/event-' . $i,
                'is_all_day' => rand(0, 1),
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}