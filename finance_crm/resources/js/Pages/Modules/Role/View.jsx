import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function RoleView({ roles = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRoles = roles.filter(role => 
        (role.name && role.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (role.description && role.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(`/role/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Roles</h1>
                        <p className="text-theme-secondary">Manage user roles and permissions</p>
                    </div>
                    <Link href="/role/new">
                        <ThemedButton variant="primary">Create Role</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Role List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search roles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Name</ThemedTableCell>
                                <ThemedTableCell header>Description</ThemedTableCell>
                                <ThemedTableCell header>Users Count</ThemedTableCell>
                                <ThemedTableCell header>Permissions</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredRoles.length > 0 ? filteredRoles.map((role) => (
                                <ThemedTableRow key={role.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{role.name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {role.description || 'No description'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {role.users_count || 0}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {role.permissions_count || 0} permissions
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={role.is_active ? 'success' : 'error'}>
                                            {role.is_active ? 'Active' : 'Inactive'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {role.created_at ? new Date(role.created_at).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/role/${role.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/role/${role.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(role.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                ['Administrator', 'Manager', 'Employee', 'Client'].map((name, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{name}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {name === 'Administrator' ? 'Full system access' :
                                             name === 'Manager' ? 'Department management access' :
                                             name === 'Employee' ? 'Basic user access' : 'Client portal access'}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {index === 0 ? 2 : index === 1 ? 5 : index === 2 ? 15 : 25}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {index === 0 ? 'All' : index === 1 ? '15' : index === 2 ? '8' : '3'} permissions
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant="success">Active</ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {new Date().toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="space-x-2">
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1 text-red-600 hover:text-red-800">Delete</ThemedButton>
                                            </div>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}