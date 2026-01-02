import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'open': return 'bg-red-100 text-red-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'resolved': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Complain Details</h1>
                        <p className="text-gray-600">View complain information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/complain"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/complain/${complain.id}/edit`}
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
                                <label className="block text-sm font-medium text-gray-500">Title</label>
                                <p className="mt-1 text-sm text-gray-900">{complain.title}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(complain.status)}`}>
                                    {complain.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Priority</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getPriorityColor(complain.priority)}`}>
                                    {complain.priority}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Source</label>
                                <p className="mt-1 text-sm text-gray-900">{complain.source || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(complain.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(complain.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {complain.resolved_at && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Resolved At</label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(complain.resolved_at).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Description</label>
                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-900 whitespace-pre-wrap">{complain.description}</p>
                            </div>
                        </div>

                        {complain.resolution_notes && (
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Resolution Notes</label>
                                <div className="mt-1 p-3 bg-green-50 rounded-md">
                                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{complain.resolution_notes}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Complainant Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-sm text-gray-900">{complain.complainant_name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-sm text-gray-900">{complain.complainant_email || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Phone</label>
                                <p className="mt-1 text-sm text-gray-900">{complain.complainant_phone || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Assignment & Client Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Client</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {complain.client ? complain.client.name : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Assigned To</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {complain.assigned_user ? complain.assigned_user.name : 'Unassigned'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created By</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {complain.creator ? complain.creator.name : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}