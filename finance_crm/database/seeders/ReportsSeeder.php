<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reports;

class ReportsSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['sales', 'financial', 'performance', 'analytics'];
        
        for ($i = 1; $i <= 15; $i++) {
            Reports::create([
                'name' => 'Report ' . $i,
                'type' => $types[array_rand($types)],
                'parameters' => json_encode(['param1' => 'value1', 'param2' => 'value2']),
                'description' => 'Description for report ' . $i,
                'created_by' => 1,
                'generated_at' => rand(0, 1) ? now() : null,
            ]);
        }
    }
}