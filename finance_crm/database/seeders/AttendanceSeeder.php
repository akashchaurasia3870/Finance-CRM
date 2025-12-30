<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attendance;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['present', 'absent', 'late'];
        
        for ($i = 1; $i <= 15; $i++) {
            Attendance::create([
                'user_id' => 1,
                'date' => now()->subDays(rand(1, 30)),
                'check_in' => '09:' . str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT),
                'check_out' => '17:' . str_pad(rand(0, 59), 2, '0', STR_PAD_LEFT),
                'status' => $statuses[array_rand($statuses)],
                'notes' => 'Attendance note ' . $i,
            ]);
        }
    }
}