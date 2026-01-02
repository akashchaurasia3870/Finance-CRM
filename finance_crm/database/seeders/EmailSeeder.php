<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Email;
use App\Models\EmailTemplate;
use App\Models\User;

class EmailSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['draft', 'queued', 'sent', 'failed'];
        $templates = EmailTemplate::limit(5)->get();
        $users = User::limit(3)->get();
        
        for ($i = 1; $i <= 20; $i++) {
            $status = $statuses[array_rand($statuses)];
            $sentAt = null;
            $failureReason = null;
            $retryCount = 0;
            
            if ($status === 'sent') {
                $sentAt = now()->subDays(rand(1, 30));
            } elseif ($status === 'failed') {
                $failureReason = ['SMTP Error', 'Invalid Email', 'Timeout', 'Rejected'][array_rand(['SMTP Error', 'Invalid Email', 'Timeout', 'Rejected'])];
                $retryCount = rand(1, 3);
            }
            
            Email::create([
                'to_email' => 'recipient' . $i . '@example.com',
                'from_email' => rand(0, 1) ? 'noreply@company.com' : null,
                'cc' => rand(0, 1) ? 'cc' . $i . '@example.com' : null,
                'bcc' => rand(0, 1) ? 'bcc' . $i . '@example.com' : null,
                'subject' => 'Email Subject ' . $i . ' - ' . ['Important Update', 'Newsletter', 'Reminder', 'Welcome'][array_rand(['Important Update', 'Newsletter', 'Reminder', 'Welcome'])],
                'body' => '<p>This is the email body content for email ' . $i . '. It contains important information.</p>',
                'email_template_id' => $templates->isNotEmpty() && rand(0, 1) ? $templates->random()->id : null,
                'status' => $status,
                'retry_count' => $retryCount,
                'failure_reason' => $failureReason,
                'created_by' => $users->isNotEmpty() ? $users->random()->id : null,
                'sent_at' => $sentAt,
                'created_at' => now()->subDays(rand(1, 45)),
                'updated_at' => now()->subDays(rand(0, 20)),
            ]);
        }
    }
}