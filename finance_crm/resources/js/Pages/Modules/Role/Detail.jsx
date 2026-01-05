import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function RoleDetail({ role }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(`/role/${role.id}`, {
                onSuccess: () => {
                    router.visit('/role');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Role Details</h1>
                        <p className="text-theme-secondary">View role information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/role">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/role/${role.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Basic Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{role.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={role.is_active ? 'success' : 'error'}>
                                        {role.is_active ? 'Active' : 'Inactive'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-theme-muted">Description</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {role.description || 'No description provided'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(role.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(role.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {role.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{role.creator.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemedCard>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Permissions</h3>
                    </div>
                    <div className="p-6">
                        {role.permissions && Array.isArray(role.permissions) && role.permissions.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {role.permissions.map((permission, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-sm text-theme-primary">{permission}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-theme-muted text-sm">No permissions assigned to this role.</p>
                        )}
                    </div>
                </ThemedCard>

                {role.users && role.users.length > 0 && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Users with this Role</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-2">
                                {role.users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-theme-surface rounded-md">
                                        <div>
                                            <p className="font-medium text-theme-primary">{user.name}</p>
                                            <p className="text-sm text-theme-secondary">{user.email}</p>
                                        </div>
                                        <ThemedBadge variant={user.pivot?.is_active ? 'success' : 'error'}>
                                            {user.pivot?.is_active ? 'Active' : 'Inactive'}
                                        </ThemedBadge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ThemedCard>
                )}
            </div>
        </Layout>
    );
}
