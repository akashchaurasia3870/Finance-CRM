<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmailTemplate;

class EmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['welcome', 'notification', 'marketing', 'reminder', 'invoice'];
        
        $templates = [
            ['name' => 'Welcome Email', 'slug' => 'welcome-email', 'subject' => 'Welcome to Finance CRM'],
            ['name' => 'Password Reset', 'slug' => 'password-reset', 'subject' => 'Reset Your Password'],
            ['name' => 'Meeting Reminder', 'slug' => 'meeting-reminder', 'subject' => 'Meeting Reminder'],
            ['name' => 'Invoice Generated', 'slug' => 'invoice-generated', 'subject' => 'Your Invoice is Ready'],
            ['name' => 'Campaign Newsletter', 'slug' => 'campaign-newsletter', 'subject' => 'Monthly Newsletter'],
            ['name' => 'Account Activation', 'slug' => 'account-activation', 'subject' => 'Activate Your Account'],
            ['name' => 'Payment Confirmation', 'slug' => 'payment-confirmation', 'subject' => 'Payment Received'],
            ['name' => 'Task Assignment', 'slug' => 'task-assignment', 'subject' => 'New Task Assigned'],
        ];
        
        foreach ($templates as $i => $template) {
            EmailTemplate::create([
                'name' => $template['name'],
                'slug' => $template['slug'],
                'subject' => $template['subject'],
                'body' => '<p>This is the email template body for ' . $template['name'] . '</p>',
                'category' => $categories[array_rand($categories)],
                'is_active' => true,
                'version' => 1,
                'created_by' => 1,
            ]);
        }
    }
}