import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function EmailTemplateDetail({ template }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this email template?')) {
            router.delete(`/emailtemplate/${template.id}`, {
                onSuccess: () => {
                    router.visit('/emailtemplate');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Email Template Details</h1>
                        <p className="text-theme-secondary">View template information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/emailtemplate">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/emailtemplate/${template.id}/edit`}>
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
                                <p className="mt-1 text-sm text-theme-primary">{template.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Slug</label>
                                <p className="mt-1 text-sm text-theme-primary">{template.slug}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Category</label>
                                <p className="mt-1 text-sm text-theme-primary">{template.category || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Version</label>
                                <p className="mt-1 text-sm text-theme-primary">v{template.version}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={template.is_active ? 'success' : 'error'}>
                                        {template.is_active ? 'Active' : 'Inactive'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(template.created_at).toLocaleString()}
                                </p>
                            </div>
                            {template.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{template.creator.name}</p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-theme-muted">Subject</label>
                            <div className="mt-1 p-3 bg-theme-surface rounded-md">
                                <p className="text-sm text-theme-primary">{template.subject}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-muted">Body</label>
                            <div className="mt-1 p-3 bg-theme-surface rounded-md max-h-96 overflow-y-auto break-words">
                                <pre className="text-sm text-theme-primary whitespace-pre-wrap font-mono">{template.body}</pre>
                            </div>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
