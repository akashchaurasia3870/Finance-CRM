<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@financecrm.com',
            'password' => Hash::make('password'),
            'is_active' => true,
            'created_by' => null,
        ]);

        User::create([
            'name' => 'Manager User',
            'email' => 'manager@financecrm.com',
            'password' => Hash::make('password'),
            'is_active' => true,
            'created_by' => 1,
        ]);

        User::create([
            'name' => 'Employee User',
            'email' => 'employee@financecrm.com',
            'password' => Hash::make('password'),
            'is_active' => true,
            'created_by' => 1,
        ]);

        User::factory(10)->create([
            'created_by' => 1,
        ]);
    }
}