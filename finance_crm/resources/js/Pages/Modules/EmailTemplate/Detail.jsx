import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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
                        <h1 className="text-2xl font-bold text-gray-900">Email Template Details</h1>
                        <p className="text-gray-600">View template information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/emailtemplate"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/emailtemplate/${template.id}/edit`}
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
                        <h3 className="text-lg font-medium">Basic Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-sm text-gray-900">{template.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Slug</label>
                                <p className="mt-1 text-sm text-gray-900">{template.slug}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Category</label>
                                <p className="mt-1 text-sm text-gray-900">{template.category || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Version</label>
                                <p className="mt-1 text-sm text-gray-900">v{template.version}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    template.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {template.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(template.created_at).toLocaleString()}
                                </p>
                            </div>
                            {template.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{template.creator.name}</p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Subject</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-900">{template.subject}</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Body</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md max-h-96 overflow-y-auto break-words">
                                <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono">{template.body}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}