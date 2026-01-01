<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Address;
use App\Models\User;

class AddressSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        
        $addresses = [
            [
                'type' => 'current',
                'address_line_1' => '123 Main Street',
                'address_line_2' => 'Apartment 4B',
                'city' => 'Mumbai',
                'state' => 'Maharashtra',
                'country' => 'India',
                'postal_code' => '400001',
            ],
            [
                'type' => 'permanent',
                'address_line_1' => '456 Park Avenue',
                'city' => 'Delhi',
                'state' => 'Delhi',
                'country' => 'India',
                'postal_code' => '110001',
            ],
            [
                'type' => 'office',
                'address_line_1' => '789 Business District',
                'address_line_2' => 'Floor 12, Suite 1201',
                'city' => 'Bangalore',
                'state' => 'Karnataka',
                'country' => 'India',
                'postal_code' => '560001',
            ],
            [
                'type' => 'billing',
                'address_line_1' => '321 Finance Street',
                'city' => 'Chennai',
                'state' => 'Tamil Nadu',
                'country' => 'India',
                'postal_code' => '600001',
            ],
            [
                'type' => 'shipping',
                'address_line_1' => '654 Delivery Lane',
                'city' => 'Pune',
                'state' => 'Maharashtra',
                'country' => 'India',
                'postal_code' => '411001',
            ],
        ];
        
        foreach ($addresses as $addressData) {
            if ($users->isNotEmpty()) {
                $addressData['user_id'] = $users->random()->id;
            }
            Address::create($addressData);
        }
    }
}