<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Margin;

class MarginSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            $limit = rand(100000, 1000000);
            $used = rand(0, $limit);
            
            Margin::create([
                'account_number' => 'MG' . str_pad($i, 6, '0', STR_PAD_LEFT),
                'margin_limit' => $limit,
                'used_margin' => $used,
                'available_margin' => $limit - $used,
                'maintenance_margin' => $limit * 0.25,
                'client_id' => 1,
            ]);
        }
    }
}