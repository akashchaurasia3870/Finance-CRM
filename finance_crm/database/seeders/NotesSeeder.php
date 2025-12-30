<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Notes;

class NotesSeeder extends Seeder
{
    public function run(): void
    {
        $categories = ['personal', 'work', 'meeting', 'idea'];
        
        for ($i = 1; $i <= 15; $i++) {
            Notes::create([
                'title' => 'Note ' . $i,
                'content' => 'Content for note ' . $i,
                'user_id' => 1,
                'category' => $categories[array_rand($categories)],
                'is_private' => rand(0, 1),
            ]);
        }
    }
}