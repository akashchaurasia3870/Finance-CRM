<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Email;

class EmailSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['draft', 'sent', 'failed'];
        
        for ($i = 1; $i <= 15; $i++) {
            Email::create([
                'to_email' => 'recipient' . $i . '@example.com',
                'from_email' => 'sender@company.com',
                'subject' => 'Email Subject ' . $i,
                'body' => 'Email body content for email ' . $i,
                'status' => $statuses[array_rand($statuses)],
                'sent_at' => rand(0, 1) ? now() : null,
            ]);
        }
    }
}