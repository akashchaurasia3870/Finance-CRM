import React from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function AccountNew({ clients = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        account_no: '',
        name: '',
        email: '',
        balance: '0.00',
        status: 'active',
        client_id: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/accounts');
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/accounts">
                        <ThemedButton variant="ghost">← Back</ThemedButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Create Account</h1>
                        <p className="text-theme-secondary">Add new financial account</p>
                    </div>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Account Number *</label>
                                <ThemedInput
                                    type="text"
                                    value={data.account_no}
                                    onChange={(e) => setData('account_no', e.target.value)}
                                    className={errors.account_no ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.account_no && <p className="text-red-500 text-sm mt-1">{errors.account_no}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Name *</label>
                                <ThemedInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Email</label>
                                <ThemedInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Initial Balance</label>
                                <ThemedInput
                                    type="number"
                                    step="0.01"
                                    value={data.balance}
                                    onChange={(e) => setData('balance', e.target.value)}
                                    className={errors.balance ? 'border-red-500' : ''}
                                />
                                {errors.balance && <p className="text-red-500 text-sm mt-1">{errors.balance}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Status</label>
                                <ThemedSelect
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="suspended">Suspended</option>
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Client</label>
                                <ThemedSelect
                                    value={data.client_id}
                                    onChange={(e) => setData('client_id', e.target.value)}
                                >
                                    <option value="">Select Client</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </ThemedSelect>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/accounts">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Account'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}