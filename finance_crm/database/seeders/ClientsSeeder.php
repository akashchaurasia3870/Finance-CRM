<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Client;

class ClientsSeeder extends Seeder
{
    public function run(): void
    {
        $companies = ['Tech Corp', 'Finance Ltd', 'Healthcare Inc', 'Energy Solutions', 'Retail Group'];
        $statuses = ['active', 'inactive'];
        
        for ($i = 1; $i <= 12; $i++) {
            Client::create([
                'name' => 'Client ' . $i,
                'email' => 'client' . $i . '@example.com',
                'phone' => '+1234567' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'company' => $companies[array_rand($companies)],
                'address' => $i . ' Business Street, City, State',
                'status' => $statuses[array_rand($statuses)],
                'created_by' => 1,
            ]);
        }
    }
}