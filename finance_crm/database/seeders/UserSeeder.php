<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user only if it doesn't exist
        if (!User::where('email', 'admin@financecrm.com')->exists()) {
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@financecrm.com',
                'password' => Hash::make('password'),
                'is_active' => true,
                'created_by' => null,
            ]);
        }
        
        // Create additional users
        $users = [
            ['name' => 'John Manager', 'email' => 'john@financecrm.com'],
            ['name' => 'Sarah Advisor', 'email' => 'sarah@financecrm.com'],
            ['name' => 'Mike Analyst', 'email' => 'mike@financecrm.com'],
            ['name' => 'Lisa Support', 'email' => 'lisa@financecrm.com'],
        ];
        
        foreach ($users as $user) {
            if (!User::where('email', $user['email'])->exists()) {
                User::create([
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => Hash::make('password'),
                    'is_active' => true,
                    'created_by' => 1,
                ]);
            }
        }
    }
}