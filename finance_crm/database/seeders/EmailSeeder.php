<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Email;

class EmailSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['draft', 'queued', 'sent', 'failed'];
        
        for ($i = 1; $i <= 15; $i++) {
            Email::create([
                'to_email' => 'client' . rand(1, 12) . '@example.com',
                'from_email' => 'system@financecrm.com',
                'cc' => rand(0, 1) ? 'manager@financecrm.com' : null,
                'bcc' => null,
                'subject' => 'Email Subject ' . $i,
                'body' => 'Email body content for email ' . $i . '. This is a sample email content.',
                'email_template_id' => rand(1, 5),
                'status' => $statuses[array_rand($statuses)],
                'retry_count' => rand(0, 3),
                'failure_reason' => null,
                'created_by' => 1,
                'sent_at' => rand(0, 1) ? now()->subDays(rand(0, 30)) : null,
            ]);
        }
    }
}