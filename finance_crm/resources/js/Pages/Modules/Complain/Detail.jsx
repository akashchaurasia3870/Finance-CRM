import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function ComplainDetail({ complain }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this complain?')) {
            router.delete(`/complain/${complain.id}`, {
                onSuccess: () => {
                    router.visit('/complain');
                }
            });
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'open': return 'error';
            case 'in_progress': return 'warning';
            case 'resolved': return 'success';
            case 'closed': return 'info';
            default: return 'info';
        }
    };

    const getPriorityVariant = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Complain Details</h1>
                        <p className="text-theme-secondary">View complain information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/complain">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/complain/${complain.id}/edit`}>
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
                                <label className="block text-sm font-medium text-theme-muted">Title</label>
                                <p className="mt-1 text-sm text-theme-primary">{complain.title}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getStatusVariant(complain.status)}>
                                        {complain.status.replace('_', ' ')}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Priority</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getPriorityVariant(complain.priority)}>
                                        {complain.priority}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Source</label>
                                <p className="mt-1 text-sm text-theme-primary">{complain.source || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(complain.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(complain.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {complain.resolved_at && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Resolved At</label>
                                    <p className="mt-1 text-sm text-theme-secondary">
                                        {new Date(complain.resolved_at).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-theme-muted">Description</label>
                            <div className="mt-1 p-3 bg-theme-primary rounded-md">
                                <p className="text-sm text-theme-primary whitespace-pre-wrap">{complain.description}</p>
                            </div>
                        </div>

                        {complain.resolution_notes && (
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Resolution Notes</label>
                                <div className="mt-1 p-3 bg-theme-primary rounded-md">
                                    <p className="text-sm text-theme-primary whitespace-pre-wrap">{complain.resolution_notes}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </ThemedCard>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Complainant Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{complain.complainant_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Email</label>
                                <p className="mt-1 text-sm text-theme-primary">{complain.complainant_email || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Phone</label>
                                <p className="mt-1 text-sm text-theme-primary">{complain.complainant_phone || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </ThemedCard>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Assignment & Client Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Client</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {complain.client ? complain.client.name : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Assigned To</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {complain.assigned_user ? complain.assigned_user.name : 'Unassigned'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {complain.creator ? complain.creator.name : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
