<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Home;

class HomeSeeder extends Seeder
{
    public function run(): void
    {
        $widgets = ['chart', 'stats', 'news', 'calendar', 'tasks'];
        
        for ($i = 1; $i <= 15; $i++) {
            Home::create([
                'title' => 'Widget ' . $i,
                'content' => 'Widget content for ' . $i,
                'widget_type' => $widgets[array_rand($widgets)],
                'sort_order' => $i,
                'is_active' => rand(0, 1),
            ]);
        }
    }
}