import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

export default function NewRole() {
    const [data, setData] = useState({
        name: '',
        description: '',
        permissions: [],
        is_active: true,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const availablePermissions = [
        'users.create', 'users.read', 'users.update', 'users.delete',
        'roles.create', 'roles.read', 'roles.update', 'roles.delete',
        'clients.create', 'clients.read', 'clients.update', 'clients.delete',
        'leads.create', 'leads.read', 'leads.update', 'leads.delete',
        'tasks.create', 'tasks.read', 'tasks.update', 'tasks.delete',
        'campaigns.create', 'campaigns.read', 'campaigns.update', 'campaigns.delete',
        'reports.read', 'reports.generate',
    ];

    const handlePermissionChange = (permission) => {
        const newPermissions = data.permissions.includes(permission)
            ? data.permissions.filter(p => p !== permission)
            : [...data.permissions, permission];
        setData({...data, permissions: newPermissions});
    };

    const handleSelectAll = (checked) => {
        setData({...data, permissions: checked ? [...availablePermissions] : []});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/role', data, {
            onSuccess: () => {
                router.visit('/role');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Create Role</h1>
                        <p className="text-theme-secondary">Add a new role to the system</p>
                    </div>
                    <Link href="/role">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Role Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Name *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({...data, name: e.target.value})}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description
                                </label>
                                <ThemedTextarea
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                    rows="3"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Permissions
                                </label>
                                <div className="border border-theme rounded-md p-4 max-h-60 overflow-y-auto bg-theme-primary">
                                    <div className="flex items-center mb-3 pb-2 border-b border-theme">
                                        <input
                                            type="checkbox"
                                            id="select-all"
                                            checked={data.permissions.length === availablePermissions.length}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            className="mr-2"
                                        />
                                        <label htmlFor="select-all" className="text-sm font-medium text-theme-primary">
                                            Select All
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {availablePermissions.map((permission) => (
                                            <div key={permission} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={permission}
                                                    checked={data.permissions.includes(permission)}
                                                    onChange={() => handlePermissionChange(permission)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={permission} className="text-sm text-theme-primary">
                                                    {permission}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {errors.permissions && <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData({...data, is_active: e.target.checked})}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-theme-primary">
                                    Active
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/role">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
