<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmailTemplate;

class EmailTemplateSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['welcome', 'notification', 'marketing', 'reminder'];
        
        for ($i = 1; $i <= 15; $i++) {
            EmailTemplate::create([
                'name' => 'Template ' . $i,
                'subject' => 'Template Subject ' . $i,
                'body' => 'Template body content for template ' . $i,
                'category' => $categories[array_rand($categories)],
                'is_active' => rand(0, 1),
            ]);
        }
    }
}