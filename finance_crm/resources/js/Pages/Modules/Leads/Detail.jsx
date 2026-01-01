import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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

    const getStatusColor = (status) => {
        switch(status) {
            case 'new': return 'bg-blue-100 text-blue-800';
            case 'contacted': return 'bg-yellow-100 text-yellow-800';
            case 'qualified': return 'bg-purple-100 text-purple-800';
            case 'converted': return 'bg-green-100 text-green-800';
            case 'lost': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
                        <p className="text-gray-600">View lead information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/leads"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/leads/${lead.id}/edit`}
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
                        <h3 className="text-lg font-medium">Lead Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-sm text-gray-900">{lead.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-sm text-gray-900">{lead.email || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Phone</label>
                                <p className="mt-1 text-sm text-gray-900">{lead.phone || 'Not provided'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                                    {lead.status}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Value</label>
                                <p className="mt-1 text-sm text-gray-900">{lead.value ? `$${lead.value}` : 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Source</label>
                                <p className="mt-1 text-sm text-gray-900">{lead.source || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Campaign</label>
                                <p className="mt-1 text-sm text-gray-900">{lead.campaign || 'Not specified'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Assigned To</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {lead.assigned_to ? (lead.assigned_to.name || 'N/A') : 'Unassigned'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Follow Up Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {lead.follow_up_date ? new Date(lead.follow_up_date).toLocaleDateString() : 'Not scheduled'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Converted At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {lead.converted_at ? new Date(lead.converted_at).toLocaleDateString() : 'Not converted'}
                                </p>
                            </div>
                            {lead.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{lead.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(lead.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(lead.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {lead.notes && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">Notes</label>
                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{lead.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}