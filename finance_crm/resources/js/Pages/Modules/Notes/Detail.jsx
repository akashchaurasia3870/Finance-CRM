import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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

    const getCategoryColor = (category) => {
        const colors = {
            'personal': 'bg-blue-100 text-blue-800',
            'work': 'bg-green-100 text-green-800',
            'meeting': 'bg-purple-100 text-purple-800',
            'follow-up': 'bg-yellow-100 text-yellow-800',
            'important': 'bg-red-100 text-red-800',
        };
        return colors[category?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Note Details</h1>
                        <p className="text-gray-600">View note information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/notes"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/notes/${note.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Note Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Title</label>
                                <p className="mt-1 text-sm text-gray-900">{note.title}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Category</label>
                                {note.category ? (
                                    <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getCategoryColor(note.category)}`}>
                                        {note.category}
                                    </span>
                                ) : (
                                    <p className="mt-1 text-sm text-gray-500">No category</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Client</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {note.client ? note.client.name : 'No client assigned'}
                                </p>
                            </div>
                            {note.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{note.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(note.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(note.updated_at).toLocaleString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-500">Content</label>
                                <div className="mt-1 p-4 bg-gray-50 rounded-md">
                                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{note.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}