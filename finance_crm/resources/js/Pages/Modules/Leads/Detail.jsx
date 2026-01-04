import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function LeadDetail({ lead }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this lead?')) {
            router.delete(`/leads/${lead.id}`, {
                onSuccess: () => {
                    router.visit('/leads');
                }
            });
        }
    };

    const getStatusVariant = (status) => {
        switch(status) {
            case 'new': return 'info';
            case 'contacted': return 'warning';
            case 'qualified': return 'primary';
            case 'converted': return 'success';
            case 'lost': return 'error';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Lead Details</h1>
                        <p className="text-theme-secondary">View lead information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/leads">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/leads/${lead.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Lead Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{lead.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Email</label>
                                <p className="mt-1 text-sm text-theme-primary">{lead.email || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Phone</label>
                                <p className="mt-1 text-sm text-theme-primary">{lead.phone || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getStatusVariant(lead.status)}>
                                        {lead.status}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Value</label>
                                <p className="mt-1 text-sm text-theme-primary">{lead.value ? `$${lead.value}` : 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Source</label>
                                <p className="mt-1 text-sm text-theme-primary">{lead.source || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Campaign</label>
                                <p className="mt-1 text-sm text-theme-primary">{lead.campaign || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Assigned To</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {lead.assigned_to ? (lead.assigned_to.name || 'N/A') : 'Unassigned'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Follow Up Date</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {lead.follow_up_date ? new Date(lead.follow_up_date).toLocaleDateString() : 'Not scheduled'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Converted At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {lead.converted_at ? new Date(lead.converted_at).toLocaleDateString() : 'Not converted'}
                                </p>
                            </div>
                            {lead.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{lead.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(lead.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(lead.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {lead.notes && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-theme-muted">Notes</label>
                                    <p className="mt-1 text-sm text-theme-primary whitespace-pre-wrap">{lead.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
