<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Meetings;

class MeetingsSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['scheduled', 'ongoing', 'completed', 'cancelled'];
        
        for ($i = 1; $i <= 15; $i++) {
            Meetings::create([
                'title' => 'Meeting ' . $i,
                'description' => 'Description for meeting ' . $i,
                'start_time' => now()->addDays(rand(1, 30)),
                'end_time' => now()->addDays(rand(1, 30))->addHours(2),
                'location' => 'Room ' . $i,
                'organizer_id' => 1,
                'status' => $statuses[array_rand($statuses)],
            ]);
        }
    }
}