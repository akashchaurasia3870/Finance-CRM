import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function AccountView({ accounts = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAccounts = accounts.filter(account => 
        account.account_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.account_no?.includes(searchTerm) ||
        account.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this account?')) {
            router.delete(`/accounts/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Accounts</h1>
                        <p className="text-theme-secondary">Manage financial accounts</p>
                    </div>
                    <Link href="/accounts/new">
                        <ThemedButton variant="primary">Create</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Account List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search accounts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Account No</ThemedTableCell>
                                <ThemedTableCell header>Account Type</ThemedTableCell>
                                <ThemedTableCell header>Balance</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Client</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredAccounts.map((account) => (
                                <ThemedTableRow key={account.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{account.account_no}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary capitalize">
                                            {account.account_type?.replace('_', ' ')}
                                        </div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-semibold">
                                        ${account.balance}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            account.status === 'active' ? 'success' :
                                            account.status === 'inactive' ? 'warning' : 'error'
                                        }>
                                            {account.status}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {account.client?.name || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/accounts/${account.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/accounts/${account.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(account.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredAccounts.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No accounts found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
