<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientsSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            Client::create([
                'name' => 'Client ' . $i,
                'email' => 'client' . $i . '@example.com',
                'phone' => '555-' . str_pad($i, 3, '0', STR_PAD_LEFT) . '-' . rand(1000, 9999),
                'company' => 'Company ' . $i,
                'address' => $i . ' Business Ave, City',
                'status' => rand(0, 1) ? 'active' : 'inactive',
            ]);
        }
    }
}