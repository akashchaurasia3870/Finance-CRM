import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

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
                        <h1 className="text-2xl font-bold text-theme-primary">Create Campaign</h1>
                        <p className="text-theme-secondary">Add a new marketing campaign</p>
                    </div>
                    <Link href="/campaigns">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Campaign Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Name *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({...data, name: e.target.value})}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description
                                </label>
                                <ThemedTextarea
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                    rows={4}
                                    placeholder="Campaign description and objectives"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Type
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData({...data, type: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    >
                                        <option value="email">Email</option>
                                        <option value="sms">SMS</option>
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
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
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Budget
                                </label>
                                <ThemedInput
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.budget}
                                    onChange={(e) => setData({...data, budget: e.target.value})}
                                    placeholder="0.00"
                                />
                                {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Start Date
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData({...data, start_date: e.target.value})}
                                    />
                                    {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        End Date
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData({...data, end_date: e.target.value})}
                                    />
                                    {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Select Clients (Optional)
                                </label>
                                <div className="border border-theme rounded-md p-4 max-h-48 overflow-y-auto bg-theme-primary">
                                    {clients.length > 0 ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center border-b border-theme pb-2 mb-2">
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
                                                <label htmlFor="select-all-clients" className="text-sm font-medium text-theme-primary">
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
                                                    <label htmlFor={`client-${client.id}`} className="text-sm text-theme-primary">
                                                        {client.name} ({client.email})
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-theme-muted text-sm">No clients available</p>
                                    )}
                                </div>
                                {errors.clients && <p className="text-red-500 text-sm mt-1">{errors.clients}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/campaigns">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
