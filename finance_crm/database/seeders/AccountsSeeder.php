<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Accounts;

class AccountsSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['active', 'inactive', 'blocked'];
        
        for ($i = 1; $i <= 15; $i++) {
            Accounts::create([
                'account_no' => str_pad(rand(100000000, 999999999), 9, '0', STR_PAD_LEFT),
                'name' => 'Account Holder ' . $i,
                'email' => 'account' . $i . '@example.com',
                'phone' => '+1234567' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'address' => $i . ' Main Street, City, State',
                'balance' => rand(1000, 100000),
                'status' => $statuses[array_rand($statuses)],
                'client_id' => rand(1, 10),
                'created_by' => 1,
            ]);
        }
    }
}