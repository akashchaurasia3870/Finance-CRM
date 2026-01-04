<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meetings;

class MeetingsSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['scheduled', 'ongoing', 'completed', 'cancelled'];
        
        for ($i = 1; $i <= 12; $i++) {
            $startTime = now()->addDays(rand(-30, 30))->addHours(rand(9, 17));
            
            Meetings::create([
                'title' => 'Meeting ' . $i,
                'description' => 'Meeting description for ' . $i,
                'start_time' => $startTime,
                'end_time' => $startTime->copy()->addHour(),
                'location' => 'Conference Room ' . rand(1, 5),
                'meeting_link' => 'https://meet.example.com/room-' . $i,
                'organizer_id' => rand(1, 5),
                'status' => $statuses[array_rand($statuses)],
                'created_by' => 1,
            ]);
        }
    }
}