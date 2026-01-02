<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmailTemplate;
use App\Models\User;
use Illuminate\Support\Str;

class EmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['welcome', 'notification', 'marketing', 'reminder', 'support'];
        $users = User::limit(3)->get();
        
        $templates = [
            [
                'name' => 'Welcome Email',
                'subject' => 'Welcome to Our Platform!',
                'body' => '<h1>Welcome!</h1><p>Thank you for joining our platform. We are excited to have you on board.</p>',
                'category' => 'welcome'
            ],
            [
                'name' => 'Password Reset',
                'subject' => 'Reset Your Password',
                'body' => '<h2>Password Reset Request</h2><p>Click the link below to reset your password.</p>',
                'category' => 'notification'
            ],
            [
                'name' => 'Monthly Newsletter',
                'subject' => 'Monthly Updates and News',
                'body' => '<h1>Monthly Newsletter</h1><p>Here are the latest updates from our company.</p>',
                'category' => 'marketing'
            ],
        ];
        
        foreach ($templates as $template) {
            EmailTemplate::create([
                'name' => $template['name'],
                'slug' => Str::slug($template['name']),
                'subject' => $template['subject'],
                'body' => $template['body'],
                'category' => $template['category'],
                'is_active' => true,
                'version' => 1,
                'created_by' => $users->isNotEmpty() ? $users->random()->id : null,
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now()->subDays(rand(0, 15)),
            ]);
        }
        
        // Add more random templates
        for ($i = 4; $i <= 10; $i++) {
            EmailTemplate::create([
                'name' => 'Template ' . $i,
                'slug' => 'template-' . $i,
                'subject' => 'Subject for Template ' . $i,
                'body' => '<p>This is the body content for template ' . $i . '.</p>',
                'category' => $categories[array_rand($categories)],
                'is_active' => rand(0, 1) == 1,
                'version' => rand(1, 3),
                'created_by' => $users->isNotEmpty() ? $users->random()->id : null,
                'created_at' => now()->subDays(rand(1, 60)),
                'updated_at' => now()->subDays(rand(0, 30)),
            ]);
        }
    }
}