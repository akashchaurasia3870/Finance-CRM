import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

export default function NewLead({ users = [] }) {
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        assigned_to: '',
        source: '',
        campaign: '',
        status: 'new',
        value: '',
        follow_up_date: '',
        converted_at: '',
        notes: '',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/leads', data, {
            onSuccess: () => {
                router.visit('/leads');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Add New Lead</h1>
                        <p className="text-theme-secondary">Create a new lead record</p>
                    </div>
                    <Link href="/leads">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Lead Information</h3>
                    </div>
                    <div className="p-6">
                        {errors.error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errors.error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
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
                                        Email
                                    </label>
                                    <ThemedInput
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData({...data, email: e.target.value})}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Phone
                                    </label>
                                    <ThemedInput
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData({...data, phone: e.target.value})}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Assigned To
                                    </label>
                                    <select
                                        value={data.assigned_to}
                                        onChange={(e) => setData({...data, assigned_to: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    >
                                        <option value="">Select User</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
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
                                        placeholder="e.g., Website, Referral, Cold Call"
                                    />
                                    {errors.source && <p className="text-red-500 text-sm mt-1">{errors.source}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Campaign
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.campaign}
                                        onChange={(e) => setData({...data, campaign: e.target.value})}
                                    />
                                    {errors.campaign && <p className="text-red-500 text-sm mt-1">{errors.campaign}</p>}
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
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="qualified">Qualified</option>
                                        <option value="converted">Converted</option>
                                        <option value="lost">Lost</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Value
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.value}
                                        onChange={(e) => setData({...data, value: e.target.value})}
                                        placeholder="0.00"
                                    />
                                    {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Follow Up Date
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={data.follow_up_date}
                                        onChange={(e) => setData({...data, follow_up_date: e.target.value})}
                                    />
                                    {errors.follow_up_date && <p className="text-red-500 text-sm mt-1">{errors.follow_up_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Converted At
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={data.converted_at}
                                        onChange={(e) => setData({...data, converted_at: e.target.value})}
                                    />
                                    {errors.converted_at && <p className="text-red-500 text-sm mt-1">{errors.converted_at}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Notes
                                </label>
                                <ThemedTextarea
                                    value={data.notes}
                                    onChange={(e) => setData({...data, notes: e.target.value})}
                                    rows="3"
                                />
                                {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/leads">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create Lead'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
