import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function EditComplain({ complain, clients = [], users = [] }) {
    const [data, setData] = useState({
        title: complain.title || '',
        description: complain.description || '',
        client_id: complain.client_id || '',
        complainant_name: complain.complainant_name || '',
        complainant_email: complain.complainant_email || '',
        complainant_phone: complain.complainant_phone || '',
        priority: complain.priority || 'medium',
        status: complain.status || 'open',
        assigned_to: complain.assigned_to || '',
        resolution_notes: complain.resolution_notes || '',
        source: complain.source || '',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/complain/${complain.id}`, data, {
            onSuccess: () => {
                router.visit('/complain');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Complain</h1>
                        <p className="text-gray-600">Update complain information</p>
                    </div>
                    <Link
                        href="/complain"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData({...data, title: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                rows={4}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Complainant Name *
                            </label>
                            <input
                                type="text"
                                value={data.complainant_name}
                                onChange={(e) => setData({...data, complainant_name: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.complainant_name && <p className="text-red-500 text-sm mt-1">{errors.complainant_name}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Complainant Email
                                </label>
                                <input
                                    type="email"
                                    value={data.complainant_email}
                                    onChange={(e) => setData({...data, complainant_email: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.complainant_email && <p className="text-red-500 text-sm mt-1">{errors.complainant_email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Complainant Phone
                                </label>
                                <input
                                    type="text"
                                    value={data.complainant_phone}
                                    onChange={(e) => setData({...data, complainant_phone: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.complainant_phone && <p className="text-red-500 text-sm mt-1">{errors.complainant_phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Client
                            </label>
                            <select
                                value={data.client_id}
                                onChange={(e) => setData({...data, client_id: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Client</option>
                                {clients.map((client) => (
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))}
                            </select>
                            {errors.client_id && <p className="text-red-500 text-sm mt-1">{errors.client_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Priority
                                </label>
                                <select
                                    value={data.priority}
                                    onChange={(e) => setData({...data, priority: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                                {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData({...data, status: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="open">Open</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Assign To
                            </label>
                            <select
                                value={data.assigned_to}
                                onChange={(e) => setData({...data, assigned_to: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select User</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                            {errors.assigned_to && <p className="text-red-500 text-sm mt-1">{errors.assigned_to}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Source
                            </label>
                            <input
                                type="text"
                                value={data.source}
                                onChange={(e) => setData({...data, source: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Phone, Email, Website, etc."
                            />
                            {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source}</p>}
                        </div>

                        {(data.status === 'resolved' || data.status === 'closed') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resolution Notes
                                </label>
                                <textarea
                                    value={data.resolution_notes}
                                    onChange={(e) => setData({...data, resolution_notes: e.target.value})}
                                    rows={3}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe how the complain was resolved..."
                                />
                                {errors.resolution_notes && <p className="text-red-500 text-sm mt-1">{errors.resolution_notes}</p>}
                            </div>
                        )}

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/complain"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}