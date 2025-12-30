<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Accounts;

class AccountsSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 1; $i <= 15; $i++) {
            Accounts::create([
                'name' => 'Account ' . $i,
                'email' => 'account' . $i . '@example.com',
                'phone' => '123-456-' . str_pad($i, 4, '0', STR_PAD_LEFT),
                'address' => $i . ' Main Street, City',
                'balance' => rand(1000, 50000),
                'status' => rand(0, 1) ? 'active' : 'inactive',
            ]);
        }
    }
}