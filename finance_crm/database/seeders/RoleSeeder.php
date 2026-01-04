<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['name' => 'Admin', 'description' => 'Full system access'],
            ['name' => 'Manager', 'description' => 'Management level access'],
            ['name' => 'Financial Advisor', 'description' => 'Client and portfolio management'],
            ['name' => 'Analyst', 'description' => 'Research and analysis'],
            ['name' => 'Support', 'description' => 'Customer support access'],
            ['name' => 'Compliance', 'description' => 'Compliance and audit access'],
            ['name' => 'Sales', 'description' => 'Sales and lead management'],
            ['name' => 'Operations', 'description' => 'Operational tasks'],
            ['name' => 'HR', 'description' => 'Human resources management'],
            ['name' => 'Accountant', 'description' => 'Financial accounting'],
        ];
        
        foreach ($roles as $role) {
            Role::create([
                'name' => $role['name'],
                'description' => $role['description'],
                'permissions' => json_encode(['read', 'write']),
                'is_active' => true,
                'created_by' => 1,
            ]);
        }
    }
}