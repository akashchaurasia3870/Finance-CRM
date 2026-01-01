<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Super Admin',
                'description' => 'Full system access with all permissions',
                'permissions' => ['users.create', 'users.read', 'users.update', 'users.delete', 'roles.create', 'roles.read', 'roles.update', 'roles.delete'],
                'is_active' => true,
            ],
            [
                'name' => 'Admin',
                'description' => 'Administrative access with most permissions',
                'permissions' => ['users.read', 'users.update', 'roles.read', 'clients.create', 'clients.read', 'clients.update'],
                'is_active' => true,
            ],
            [
                'name' => 'Manager',
                'description' => 'Management level access',
                'permissions' => ['clients.read', 'clients.update', 'leads.create', 'leads.read', 'leads.update'],
                'is_active' => true,
            ],
            [
                'name' => 'Employee',
                'description' => 'Basic employee access',
                'permissions' => ['clients.read', 'leads.read', 'tasks.create', 'tasks.read', 'tasks.update'],
                'is_active' => true,
            ],
            [
                'name' => 'Viewer',
                'description' => 'Read-only access',
                'permissions' => ['clients.read', 'leads.read', 'tasks.read'],
                'is_active' => true,
            ],
        ];
        
        foreach ($roles as $roleData) {
            Role::create($roleData);
        }
    }
}