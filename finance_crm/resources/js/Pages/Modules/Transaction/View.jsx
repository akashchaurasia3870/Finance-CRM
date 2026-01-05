import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function TransactionView({ transactions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTransactions = transactions.filter(transaction => 
        (transaction.reference && transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.description && transaction.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            router.delete(`/transaction/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Transactions</h1>
                        <p className="text-theme-secondary">Manage financial transactions</p>
                    </div>
                    <Link href="/transaction/new">
                        <ThemedButton variant="primary">New Transaction</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Transaction History</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Reference</ThemedTableCell>
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Amount</ThemedTableCell>
                                <ThemedTableCell header>Account</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Date</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => (
                                <ThemedTableRow key={transaction.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{transaction.reference}</div>
                                        {transaction.description && (
                                            <div className="text-sm text-theme-muted">{transaction.description.substring(0, 40)}...</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            transaction.type === 'credit' ? 'success' : 'warning'
                                        }>
                                            {transaction.type || 'Credit'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className={`font-semibold ${
                                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount || '0.00'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {transaction.account?.name || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            transaction.status === 'completed' ? 'success' :
                                            transaction.status === 'pending' ? 'warning' : 'error'
                                        }>
                                            {transaction.status || 'Completed'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/transaction/${transaction.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/transaction/${transaction.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(transaction.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                [
                                    { ref: 'TXN001', type: 'credit', amount: 5000, desc: 'Client payment received' },
                                    { ref: 'TXN002', type: 'debit', amount: 1200, desc: 'Office rent payment' },
                                    { ref: 'TXN003', type: 'credit', amount: 3500, desc: 'Investment return' }
                                ].map((txn, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{txn.ref}</div>
                                            <div className="text-sm text-theme-muted">{txn.desc}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={txn.type === 'credit' ? 'success' : 'warning'}>
                                                {txn.type}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className={`font-semibold ${
                                            txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {txn.type === 'credit' ? '+' : '-'}${txn.amount.toLocaleString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">Main Account</ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant="success">Completed</ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {new Date().toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="space-x-2">
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1 text-red-600 hover:text-red-800">Delete</ThemedButton>
                                            </div>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
