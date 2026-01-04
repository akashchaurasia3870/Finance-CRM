import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function CampaignDetail({ campaign }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this campaign?')) {
            router.delete(`/campaigns/${campaign.id}`, {
                onSuccess: () => {
                    router.visit('/campaigns');
                }
            });
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'draft': return 'info';
            case 'scheduled': return 'primary';
            case 'active': return 'success';
            case 'paused': return 'warning';
            case 'completed': return 'primary';
            case 'cancelled': return 'error';
            default: return 'info';
        }
    };

    const getTypeVariant = (type) => {
        switch (type) {
            case 'email': return 'primary';
            case 'sms': return 'success';
            case 'whatsapp': return 'success';
            case 'manual': return 'info';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Campaign Details</h1>
                        <p className="text-theme-secondary">View campaign information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/campaigns">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/campaigns/${campaign.id}/edit`}>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{campaign.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Type</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getTypeVariant(campaign.type)}>
                                        {campaign.type}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getStatusVariant(campaign.status)}>
                                        {campaign.status}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Budget</label>
                                <p className="mt-1 text-sm text-theme-primary">${parseFloat(campaign.budget).toLocaleString()}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Start Date</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {campaign.start_date ? new Date(campaign.start_date).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">End Date</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(campaign.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(campaign.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {campaign.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{campaign.creator.name}</p>
                                </div>
                            )}
                        </div>
                        
                        {campaign.description && (
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Description</label>
                                <div className="mt-1 p-3 bg-theme-surface rounded-md">
                                    <p className="text-sm text-theme-primary whitespace-pre-wrap">{campaign.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </ThemedCard>

                {campaign.clients && campaign.clients.length > 0 && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Selected Clients ({campaign.clients.length})</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {campaign.clients.map((client) => (
                                    <div key={client.id} className="flex items-center justify-between p-3 bg-theme-surface rounded-md">
                                        <div>
                                            <p className="font-medium text-theme-primary">{client.name}</p>
                                            <p className="text-sm text-theme-secondary">{client.email}</p>
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
