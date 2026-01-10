import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function EmailDetail({ email }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this email?')) {
            router.delete(`/email/${email.id}`, {
                onSuccess: () => {
                    router.visit('/email');
                }
            });
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'draft': return 'info';
            case 'queued': return 'warning';
            case 'sent': return 'success';
            case 'failed': return 'error';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Email Details</h1>
                        <p className="text-theme-secondary">View email information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/email">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/email/${email.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Email Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">To Email</label>
                                <p className="mt-1 text-sm text-theme-primary">{email.to_email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">From Email</label>
                                <p className="mt-1 text-sm text-theme-primary">{email.from_email || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">CC</label>
                                <p className="mt-1 text-sm text-theme-primary">{email.cc || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">BCC</label>
                                <p className="mt-1 text-sm text-theme-primary">{email.bcc || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getStatusVariant(email.status)}>
                                        {email.status}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Template</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {email.template ? email.template.name : 'N/A'}
                                </p>
                            </div>
                            {email.campaign && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Campaign</label>
                                    <p className="mt-1 text-sm text-theme-primary">{email.campaign.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Retry Count</label>
                                <p className="mt-1 text-sm text-theme-primary">{email.retry_count}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(email.created_at).toLocaleString()}
                                </p>
                            </div>
                            {email.sent_at && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Sent At</label>
                                    <p className="mt-1 text-sm text-theme-secondary">
                                        {new Date(email.sent_at).toLocaleString()}
                                    </p>
                                </div>
                            )}
                            {email.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{email.creator.name}</p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-theme-muted">Subject</label>
                            <div className="mt-1 p-3 bg-theme-primary rounded-md break-words">
                                <p className="text-sm text-theme-primary">{email.subject}</p>
                            </div>
                        </div>

                        {email.failure_reason && (
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Failure Reason</label>
                                <div className="mt-1 p-3 bg-theme-primary rounded-md break-words">
                                    <p className="text-sm text-red-600">{email.failure_reason}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-theme-muted">Body</label>
                            <div className="mt-1 p-3 bg-theme-primary rounded-md max-h-96 overflow-y-auto break-words">
                                <pre className="text-sm text-theme-primary whitespace-pre-wrap font-mono">{email.body}</pre>
                            </div>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
