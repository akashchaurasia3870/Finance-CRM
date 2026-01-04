<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reports;

class ReportsSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['financial', 'client', 'sales', 'performance', 'analytics'];
        
        for ($i = 1; $i <= 12; $i++) {
            Reports::create([
                'name' => 'Report ' . $i,
                'type' => $types[array_rand($types)],
                'description' => 'Description for report ' . $i,
                'user_id' => rand(1, 5),
                'created_by' => 1,
            ]);
        }
    }
}