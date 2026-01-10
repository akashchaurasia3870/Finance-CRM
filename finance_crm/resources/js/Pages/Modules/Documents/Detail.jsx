import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function DocumentDetail({ document }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this document?')) {
            router.delete(`/documents/${document.id}`, {
                onSuccess: () => {
                    router.visit('/documents');
                }
            });
        }
    };

    const handleDownload = () => {
        if (document.file_path) {
            window.open(`/storage/${document.file_path}`, '_blank');
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Document Details</h1>
                        <p className="text-theme-secondary">View document information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/documents">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <ThemedButton variant="success" onClick={handleDownload}>
                            Download
                        </ThemedButton>
                        <Link href={`/documents/${document.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Document Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Document Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{document.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">File Type</label>
                                <div className="mt-1">
                                    <ThemedBadge variant="info">
                                        {document.file_type?.toUpperCase() || 'Unknown'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">File Size</label>
                                <p className="mt-1 text-sm text-theme-primary">{formatFileSize(document.file_size)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={document.is_active ? 'success' : 'error'}>
                                        {document.is_active ? 'Active' : 'Inactive'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            {document.owner && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Owner</label>
                                    <p className="mt-1 text-sm text-theme-primary">{document.owner.name}</p>
                                    <p className="text-xs text-theme-secondary">{document.owner.email}</p>
                                </div>
                            )}
                            {document.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Uploaded By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{document.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(document.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(document.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {document.description && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-theme-muted">Description</label>
                                    <p className="mt-1 text-sm text-theme-primary">{document.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemedCard>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">File Information</h3>
                    </div>
                    <div className="p-6">
                        <div className="bg-theme-primary p-4 rounded-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-theme-primary">{document.name}</p>
                                    <p className="text-sm text-theme-secondary">
                                        {document.file_type?.toUpperCase()} • {formatFileSize(document.file_size)}
                                    </p>
                                </div>
                                <ThemedButton variant="primary" onClick={handleDownload}>
                                    Download
                                </ThemedButton>
                            </div>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
