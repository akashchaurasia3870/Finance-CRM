import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function CampaignDetail({ campaign }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this campaign?')) {
            router.delete(`/campaigns/${campaign.id}`, {
                onSuccess: () => {
                    router.visit('/campaigns');
                }
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-100 text-gray-800';
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'active': return 'bg-green-100 text-green-800';
            case 'paused': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-purple-100 text-purple-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'email': return 'bg-blue-100 text-blue-800';
            case 'sms': return 'bg-green-100 text-green-800';
            case 'whatsapp': return 'bg-emerald-100 text-emerald-800';
            case 'manual': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Campaign Details</h1>
                        <p className="text-gray-600">View campaign information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/campaigns"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/campaigns/${campaign.id}/edit`}
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
                                <p className="mt-1 text-sm text-gray-900">{campaign.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Type</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getTypeColor(campaign.type)}`}>
                                    {campaign.type}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                                    {campaign.status}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Budget</label>
                                <p className="mt-1 text-sm text-gray-900">${parseFloat(campaign.budget).toLocaleString()}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Start Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {campaign.start_date ? new Date(campaign.start_date).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">End Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(campaign.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(campaign.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {campaign.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{campaign.creator.name}</p>
                                </div>
                            )}
                        </div>
                        
                        {campaign.description && (
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Description</label>
                                <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{campaign.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {campaign.clients && campaign.clients.length > 0 && (
                    <div className="bg-white border rounded-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-medium">Selected Clients ({campaign.clients.length})</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {campaign.clients.map((client) => (
                                    <div key={client.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <div>
                                            <p className="font-medium text-gray-900">{client.name}</p>
                                            <p className="text-sm text-gray-500">{client.email}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}