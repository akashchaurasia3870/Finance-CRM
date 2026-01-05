import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedBadge } from '@/Components/ThemedComponents';

export default function RoleManagement({ roles = [], permissions = {} }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: {}
    });

    const handleCreateRole = (e) => {
        e.preventDefault();
        router.post('/settings/roles', formData, {
            onSuccess: () => {
                setShowCreateForm(false);
                setFormData({ name: '', description: '', permissions: {} });
            }
        });
    };

    const handlePermissionChange = (module, action, checked) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [module]: {
                    ...prev.permissions[module],
                    [action]: checked
                }
            }
        }));
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Role Management</h1>
                        <p className="text-theme-secondary">Manage roles and permissions</p>
                    </div>
                    <ThemedButton
                        onClick={() => setShowCreateForm(true)}
                        variant="primary"
                    >
                        Create Role
                    </ThemedButton>
                </div>

                {showCreateForm && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Create New Role</h3>
                        </div>
                        <div className="p-6">
                        <form onSubmit={handleCreateRole} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        type="text"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-md font-medium text-theme-primary mb-3">Permissions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.entries(permissions).map(([module, actions]) => (
                                        <div key={module} className="border rounded-lg p-4">
                                            <h5 className="font-medium text-theme-primary mb-2 capitalize">{module}</h5>
                                            <div className="space-y-2">
                                                {actions.map(action => (
                                                    <label key={action} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.permissions[module]?.[action] || false}
                                                            onChange={(e) => handlePermissionChange(module, action, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm capitalize">{action}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <ThemedButton
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    variant="secondary"
                                >
                                    Cancel
                                </ThemedButton>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                >
                                    Create Role
                                </ThemedButton>
                            </div>
                        </form>
                        </div>
                    </ThemedCard>
                )}

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Existing Roles</h3>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Name</ThemedTableCell>
                                <ThemedTableCell header>Description</ThemedTableCell>
                                <ThemedTableCell header>Users</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {roles.map((role) => (
                                <ThemedTableRow key={role.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{role.name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {role.description}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {role.users_count || 0} users
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={role.is_active ? 'success' : 'error'}>
                                            {role.is_active ? 'Active' : 'Inactive'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
