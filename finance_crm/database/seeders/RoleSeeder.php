<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['Admin', 'Full system access'],
            ['Manager', 'Management level access'],
            ['Employee', 'Basic employee access'],
            ['Viewer', 'Read-only access'],
            ['Accountant', 'Financial data access'],
        ];
        
        foreach ($roles as $index => $role) {
            Role::create([
                'name' => $role[0] . ' ' . ($index + 1),
                'description' => $role[1],
                'permissions' => json_encode(['read', 'write', 'delete']),
                'is_active' => rand(0, 1),
            ]);
        }
        
        for ($i = 6; $i <= 15; $i++) {
            Role::create([
                'name' => 'Role ' . $i,
                'description' => 'Description for role ' . $i,
                'permissions' => json_encode(['read']),
                'is_active' => rand(0, 1),
            ]);
        }
    }
}