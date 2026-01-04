<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notes;

class NotesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['meeting', 'call', 'email', 'general', 'follow_up'];
        
        for ($i = 1; $i <= 15; $i++) {
            Notes::create([
                'created_by' => rand(1, 5),
                'client_id' => rand(1, 12),
                'title' => 'Note ' . $i,
                'content' => 'Content for note ' . $i . '. This is a detailed note about client interaction.',
                'category' => $categories[array_rand($categories)],
            ]);
        }
    }
}