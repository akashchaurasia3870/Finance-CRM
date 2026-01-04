import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function AccountDetail({ account }) {
    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/accounts">
                            <ThemedButton variant="ghost">← Back</ThemedButton>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-theme-primary">Account Details</h1>
                            <p className="text-theme-secondary">View account information</p>
                        </div>
                    </div>
                    <Link href={`/accounts/${account.id}/edit`}>
                        <ThemedButton variant="primary">Edit Account</ThemedButton>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ThemedCard className="p-6">
                            <h3 className="text-lg font-semibold text-theme-primary mb-4">Account Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-secondary mb-1">Account Number</label>
                                    <p className="text-theme-primary font-medium">{account.account_no}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-secondary mb-1">Name</label>
                                    <p className="text-theme-primary font-medium">{account.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-secondary mb-1">Email</label>
                                    <p className="text-theme-primary">{account.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-secondary mb-1">Balance</label>
                                    <p className="text-theme-primary font-semibold text-lg">${account.balance}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-secondary mb-1">Status</label>
                                    <ThemedBadge variant={
                                        account.status === 'active' ? 'success' :
                                        account.status === 'inactive' ? 'warning' : 'error'
                                    }>
                                        {account.status}
                                    </ThemedBadge>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-secondary mb-1">Client</label>
                                    <p className="text-theme-primary">{account.client?.name || 'N/A'}</p>
                                </div>
                            </div>
                        </ThemedCard>
                    </div>

                    <div>
                        <ThemedCard className="p-6">
                            <h3 className="text-lg font-semibold text-theme-primary mb-4">Account Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-theme-secondary">Created</span>
                                    <span className="text-theme-primary">{new Date(account.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-theme-secondary">Last Updated</span>
                                    <span className="text-theme-primary">{new Date(account.updated_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-theme-secondary">Account Type</span>
                                    <span className="text-theme-primary">Standard</span>
                                </div>
                            </div>
                        </ThemedCard>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
