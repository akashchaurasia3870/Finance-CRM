import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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
                        <h1 className="text-2xl font-bold text-gray-900">Document Details</h1>
                        <p className="text-gray-600">View document information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/documents"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <button
                            onClick={handleDownload}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Download
                        </button>
                        <Link
                            href={`/documents/${document.id}/edit`}
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
                        <h3 className="text-lg font-medium">Document Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Document Name</label>
                                <p className="mt-1 text-sm text-gray-900">{document.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">File Type</label>
                                <span className="mt-1 inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                    {document.file_type?.toUpperCase() || 'Unknown'}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">File Size</label>
                                <p className="mt-1 text-sm text-gray-900">{formatFileSize(document.file_size)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    document.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {document.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            {document.owner && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Owner</label>
                                    <p className="mt-1 text-sm text-gray-900">{document.owner.name}</p>
                                    <p className="text-xs text-gray-500">{document.owner.email}</p>
                                </div>
                            )}
                            {document.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Uploaded By</label>
                                    <p className="mt-1 text-sm text-gray-900">{document.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(document.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(document.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {document.description && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">Description</label>
                                    <p className="mt-1 text-sm text-gray-900">{document.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">File Information</h3>
                    </div>
                    <div className="p-6">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">{document.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {document.file_type?.toUpperCase()} • {formatFileSize(document.file_size)}
                                    </p>
                                </div>
                                <button
                                    onClick={handleDownload}
                                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}