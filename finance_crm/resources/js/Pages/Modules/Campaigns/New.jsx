import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function NewCampaign({ clients = [] }) {
    const [data, setData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        budget: '',
        type: 'email',
        status: 'draft',
        clients: [],
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/campaigns', data, {
            onSuccess: () => {
                router.visit('/campaigns');
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
                        <h1 className="text-2xl font-bold text-gray-900">Create Campaign</h1>
                        <p className="text-gray-600">Add a new marketing campaign</p>
                    </div>
                    <Link
                        href="/campaigns"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData({...data, name: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                rows={4}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Campaign description and objectives"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Type
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData({...data, type: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="email">Email</option>
                                    <option value="sms">SMS</option>
                                    <option value="whatsapp">WhatsApp</option>
                                    <option value="manual">Manual</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
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
                                    <option value="draft">Draft</option>
                                    <option value="scheduled">Scheduled</option>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Budget
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.budget}
                                onChange={(e) => setData({...data, budget: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData({...data, start_date: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData({...data, end_date: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Clients (Optional)
                            </label>
                            <div className="border rounded-md p-4 max-h-48 overflow-y-auto">
                                {clients.length > 0 ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center border-b pb-2 mb-2">
                                            <input
                                                type="checkbox"
                                                id="select-all-clients"
                                                checked={data.clients.length === clients.length && clients.length > 0}
                                                onChange={(e) => {
                                                    const allClientIds = clients.map(client => client.id);
                                                    setData({...data, clients: e.target.checked ? allClientIds : []});
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor="select-all-clients" className="text-sm font-medium text-gray-700">
                                                Select All Clients ({clients.length})
                                            </label>
                                        </div>
                                        {clients.map((client) => (
                                            <div key={client.id} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`client-${client.id}`}
                                                    checked={data.clients.includes(client.id)}
                                                    onChange={(e) => {
                                                        const newClients = e.target.checked
                                                            ? [...data.clients, client.id]
                                                            : data.clients.filter(c => c !== client.id);
                                                        setData({...data, clients: newClients});
                                                    }}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`client-${client.id}`} className="text-sm text-gray-700">
                                                    {client.name} ({client.email})
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">No clients available</p>
                                )}
                            </div>
                            {errors.clients && <p className="text-red-500 text-sm mt-1">{errors.clients}</p>}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/campaigns"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}