import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'queued': return 'bg-yellow-100 text-yellow-800';
            case 'sent': return 'bg-green-100 text-green-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Email Details</h1>
                        <p className="text-gray-600">View email information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/email"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/email/${email.id}/edit`}
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
                        <h3 className="text-lg font-medium">Email Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">To Email</label>
                                <p className="mt-1 text-sm text-gray-900">{email.to_email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">From Email</label>
                                <p className="mt-1 text-sm text-gray-900">{email.from_email || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">CC</label>
                                <p className="mt-1 text-sm text-gray-900">{email.cc || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">BCC</label>
                                <p className="mt-1 text-sm text-gray-900">{email.bcc || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(email.status)}`}>
                                    {email.status}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Template</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {email.template ? email.template.name : 'N/A'}
                                </p>
                            </div>
                            {email.campaign && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Campaign</label>
                                    <p className="mt-1 text-sm text-gray-900">{email.campaign.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Retry Count</label>
                                <p className="mt-1 text-sm text-gray-900">{email.retry_count}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(email.created_at).toLocaleString()}
                                </p>
                            </div>
                            {email.sent_at && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Sent At</label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(email.sent_at).toLocaleString()}
                                    </p>
                                </div>
                            )}
                            {email.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{email.creator.name}</p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Subject</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md break-words">
                                <p className="text-sm text-gray-900">{email.subject}</p>
                            </div>
                        </div>

                        {email.failure_reason && (
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Failure Reason</label>
                                <div className="mt-1 p-3 bg-red-50 rounded-md break-words">
                                    <p className="text-sm text-red-900">{email.failure_reason}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-500">Body</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md max-h-96 overflow-y-auto break-words">
                                <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono">{email.body}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}