import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Complain</h1>
                        <p className="text-theme-secondary">Update complain information</p>
                    </div>
                    <Link href="/complain">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Complain Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Title *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData({...data, title: e.target.value})}
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description *
                                </label>
                                <ThemedTextarea
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                    rows={4}
                                    required
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Complainant Name *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.complainant_name}
                                    onChange={(e) => setData({...data, complainant_name: e.target.value})}
                                    required
                                />
                                {errors.complainant_name && <p className="text-red-500 text-sm mt-1">{errors.complainant_name}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Complainant Email
                                    </label>
                                    <ThemedInput
                                        type="email"
                                        value={data.complainant_email}
                                        onChange={(e) => setData({...data, complainant_email: e.target.value})}
                                    />
                                    {errors.complainant_email && <p className="text-red-500 text-sm mt-1">{errors.complainant_email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Complainant Phone
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.complainant_phone}
                                        onChange={(e) => setData({...data, complainant_phone: e.target.value})}
                                    />
                                    {errors.complainant_phone && <p className="text-red-500 text-sm mt-1">{errors.complainant_phone}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Client
                                </label>
                                <select
                                    value={data.client_id}
                                    onChange={(e) => setData({...data, client_id: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
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
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Priority
                                    </label>
                                    <select
                                        value={data.priority}
                                        onChange={(e) => setData({...data, priority: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData({...data, status: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
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
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Assign To
                                </label>
                                <select
                                    value={data.assigned_to}
                                    onChange={(e) => setData({...data, assigned_to: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
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
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Source
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.source}
                                    onChange={(e) => setData({...data, source: e.target.value})}
                                    placeholder="e.g., Phone, Email, Website, etc."
                                />
                                {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source}</p>}
                            </div>

                            {(data.status === 'resolved' || data.status === 'closed') && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Resolution Notes
                                    </label>
                                    <ThemedTextarea
                                        value={data.resolution_notes}
                                        onChange={(e) => setData({...data, resolution_notes: e.target.value})}
                                        rows={3}
                                        placeholder="Describe how the complain was resolved..."
                                    />
                                    {errors.resolution_notes && <p className="text-red-500 text-sm mt-1">{errors.resolution_notes}</p>}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3">
                                <Link href="/complain">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
