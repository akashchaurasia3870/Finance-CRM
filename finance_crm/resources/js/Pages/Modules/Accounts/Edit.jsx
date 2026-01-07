import React from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function AccountEdit({ account, clients = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        account_no: account?.account_no || '',
        account_type: account?.account_type || 'savings',
        balance: account?.balance || '',
        status: account?.status || 'active',
        client_id: account?.client_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/accounts/${account.id}`);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/accounts">
                        <ThemedButton variant="ghost">← Back</ThemedButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Account</h1>
                        <p className="text-theme-secondary">Update account information</p>
                    </div>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Account Number</label>
                                <ThemedInput
                                    type="text"
                                    value={data.account_no}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                                <p className="text-xs text-theme-secondary mt-1">Account number cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Account Type *</label>
                                <ThemedSelect
                                    value={data.account_type}
                                    onChange={(e) => setData('account_type', e.target.value)}
                                    className={errors.account_type ? 'border-red-500' : ''}
                                    required
                                >
                                    <option value="savings">Savings Account</option>
                                    <option value="checking">Checking Account</option>
                                    <option value="investment">Investment Account</option>
                                    <option value="retirement">Retirement Account</option>
                                    <option value="trading">Trading Account</option>
                                    <option value="margin">Margin Account</option>
                                    <option value="cash">Cash Account</option>
                                    <option value="ira">IRA Account</option>
                                    <option value="roth_ira">Roth IRA Account</option>
                                </ThemedSelect>
                                {errors.account_type && <p className="text-red-500 text-sm mt-1">{errors.account_type}</p>}
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

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Balance</label>
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
                                    <option value="blocked">Blocked</option>
                                </ThemedSelect>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/accounts">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Account'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
