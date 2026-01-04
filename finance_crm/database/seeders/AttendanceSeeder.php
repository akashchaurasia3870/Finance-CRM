<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attendance;
use Carbon\Carbon;

class AttendanceSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['present', 'absent', 'half_day', 'leave'];
        $sources = ['biometric', 'manual', 'mobile', 'system'];
        
        for ($userId = 1; $userId <= 5; $userId++) {
            for ($day = 0; $day < 3; $day++) {
                $status = $statuses[array_rand($statuses)];
                $checkIn = $status === 'present' ? '09:' . str_pad(rand(0, 30), 2, '0', STR_PAD_LEFT) : null;
                $checkOut = $checkIn ? '17:' . str_pad(rand(30, 59), 2, '0', STR_PAD_LEFT) : null;
                $workHours = $checkIn && $checkOut ? 8.5 : null;
                
                Attendance::updateOrCreate(
                    [
                        'user_id' => $userId,
                        'attendance_date' => now()->subDays($day)->format('Y-m-d'),
                    ],
                    [
                        'check_in_time' => $checkIn,
                        'check_out_time' => $checkOut,
                        'work_hours' => $workHours,
                        'status' => $status,
                        'source' => $sources[array_rand($sources)],
                        'is_active' => true,
                        'created_by' => 1,
                    ]
                );
            }
        }
    }
}