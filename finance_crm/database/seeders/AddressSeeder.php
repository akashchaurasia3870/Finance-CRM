<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Address;

class AddressSeeder extends Seeder
{
    public function run(): void
    {
        $types = ['current', 'permanent', 'office', 'billing'];
        $cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad'];
        $states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'West Bengal', 'Telangana'];
        
        for ($i = 1; $i <= 15; $i++) {
            Address::create([
                'user_id' => rand(1, 5),
                'type' => $types[array_rand($types)],
                'address_line_1' => $i . ' Main Street',
                'address_line_2' => 'Apartment ' . rand(1, 100),
                'city' => $cities[array_rand($cities)],
                'state' => $states[array_rand($states)],
                'country' => 'India',
                'postal_code' => str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT),
                'created_by' => 1,
            ]);
        }
    }
}