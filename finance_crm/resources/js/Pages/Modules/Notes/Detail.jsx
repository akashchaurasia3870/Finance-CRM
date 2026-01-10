import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function NoteDetail({ note }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this note?')) {
            router.delete(`/notes/${note.id}`, {
                onSuccess: () => {
                    router.visit('/notes');
                }
            });
        }
    };

    const getCategoryVariant = (category) => {
        const variants = {
            'personal': 'info',
            'work': 'success',
            'meeting': 'warning',
            'follow-up': 'warning',
            'important': 'error',
        };
        return variants[category?.toLowerCase()] || 'info';
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Note Details</h1>
                        <p className="text-theme-secondary">View note information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/notes">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/notes/${note.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Note Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Title</label>
                                <p className="mt-1 text-sm text-theme-primary">{note.title}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Category</label>
                                {note.category ? (
                                    <div className="mt-1">
                                        <ThemedBadge variant={getCategoryVariant(note.category)}>
                                            {note.category}
                                        </ThemedBadge>
                                    </div>
                                ) : (
                                    <p className="mt-1 text-sm text-theme-muted">No category</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Client</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {note.client ? note.client.name : 'No client assigned'}
                                </p>
                            </div>
                            {note.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{note.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(note.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(note.updated_at).toLocaleString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-theme-muted">Content</label>
                                <div className="mt-1 p-4 bg-theme-primary rounded-md">
                                    <p className="text-sm text-theme-primary whitespace-pre-wrap">{note.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
