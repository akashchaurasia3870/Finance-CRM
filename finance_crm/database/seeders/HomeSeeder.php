<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Home;

class HomeSeeder extends Seeder
{
    public function run(): void
    {
        $widgetTypes = ['chart', 'stats', 'table', 'calendar', 'news', 'tasks'];
        
        for ($i = 1; $i <= 10; $i++) {
            Home::create([
                'title' => 'Widget ' . $i,
                'content' => 'Content for widget ' . $i . '. This is dashboard widget content.',
                'widget_type' => $widgetTypes[array_rand($widgetTypes)],
                'sort_order' => $i,
                'is_active' => rand(0, 1),
                'created_by' => 1,
            ]);
        }
    }
}