import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function ClientDetail({ client }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this client?')) {
            router.delete(`/client/${client.id}`, {
                onSuccess: () => {
                    router.visit('/client');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Client Details</h1>
                        <p className="text-theme-secondary">View client information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/client">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/client/${client.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Client Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{client.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Email</label>
                                <p className="mt-1 text-sm text-theme-primary">{client.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Phone</label>
                                <p className="mt-1 text-sm text-theme-primary">{client.phone || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Company</label>
                                <p className="mt-1 text-sm text-theme-primary">{client.company || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={client.status === 'active' ? 'success' : 'error'}>
                                        {client.status}
                                    </ThemedBadge>
                                </div>
                            </div>
                            {client.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{client.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(client.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(client.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {client.address && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-theme-muted">Address</label>
                                    <p className="mt-1 text-sm text-theme-primary">{client.address}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
