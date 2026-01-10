import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function UserDetail({ user }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/user/${user.id}`, {
                onSuccess: () => {
                    router.visit('/user');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">User Details</h1>
                        <p className="text-theme-secondary">View user information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/user">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/user/${user.id}/edit`}>
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
                                <p className="mt-1 text-sm text-theme-primary">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Email</label>
                                <p className="mt-1 text-sm text-theme-primary">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={user.is_active ? 'success' : 'error'}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Email Verified</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={user.email_verified_at ? 'success' : 'warning'}>
                                        {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(user.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(user.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {user.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{user.creator.name}</p>
                                </div>
                            )}
                            {user.email_verified_at && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Email Verified At</label>
                                    <p className="mt-1 text-sm text-theme-secondary">
                                        {new Date(user.email_verified_at).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemedCard>

                {user.roles && user.roles.length > 0 && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Assigned Roles</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {user.roles.map((role) => (
                                    <div key={role.id} className="flex items-center justify-between p-3 bg-theme-primary rounded-md">
                                        <div>
                                            <p className="font-medium text-theme-primary">{role.name}</p>
                                            <p className="text-sm text-theme-secondary">{role.description}</p>
                                        </div>
                                        <ThemedBadge variant={role.pivot?.is_active ? 'success' : 'error'}>
                                            {role.pivot?.is_active ? 'Active' : 'Inactive'}
                                        </ThemedBadge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {user.addresses && user.addresses.length > 0 && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Addresses</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {user.addresses.map((address) => (
                                    <div key={address.id} className="p-4 bg-theme-primary rounded-md">
                                        <div className="flex justify-between items-start mb-2">
                                            <ThemedBadge variant="info">
                                                {address.type}
                                            </ThemedBadge>
                                        </div>
                                        <div className="text-sm text-theme-primary">
                                            <p>{address.address_line_1}</p>
                                            {address.address_line_2 && <p>{address.address_line_2}</p>}
                                            <p>
                                                {address.city}
                                                {address.state && `, ${address.state}`}
                                                {address.postal_code && ` - ${address.postal_code}`}
                                            </p>
                                            <p>{address.country}</p>
                                        </div>
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
