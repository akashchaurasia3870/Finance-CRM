<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bond;

class BondsSeeder extends Seeder
{
    public function run(): void
    {
        $issuers = ['US Treasury', 'Corporate Bond A', 'Municipal Bond', 'Government Bond'];
        
        for ($i = 1; $i <= 15; $i++) {
            Bond::create([
                'name' => 'Bond ' . $i,
                'issuer' => $issuers[array_rand($issuers)],
                'face_value' => rand(1000, 10000),
                'coupon_rate' => rand(200, 800) / 100,
                'maturity_date' => now()->addYears(rand(1, 10)),
            ]);
        }
    }
}