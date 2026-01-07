import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function TransactionView({ transactions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTransactions = transactions.filter(transaction => 
        (transaction.reference && transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.notes && transaction.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.portfolio?.portfolio_name && transaction.portfolio.portfolio_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.product?.name && transaction.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            router.delete(`/transaction/${id}`);
        }
    };

    const getTransactionTypeColor = (type) => {
        switch(type) {
            case 'buy': return 'success';
            case 'sell': return 'warning';
            case 'deposit': return 'info';
            case 'withdraw': return 'error';
            case 'dividend': return 'success';
            case 'margin_use': return 'warning';
            case 'margin_repay': return 'info';
            default: return 'default';
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'completed': return 'success';
            case 'pending': return 'warning';
            case 'failed': return 'error';
            default: return 'default';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Transactions</h1>
                        <p className="text-theme-secondary">Manage financial transactions across client portfolios</p>
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
                                <ThemedTableCell header>Client & Portfolio</ThemedTableCell>
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Product</ThemedTableCell>
                                <ThemedTableCell header>Quantity</ThemedTableCell>
                                <ThemedTableCell header>Price</ThemedTableCell>
                                <ThemedTableCell header>Amount</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Date</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredTransactions.length > 0 ? filteredTransactions.map((transaction) => (
                                <ThemedTableRow key={transaction.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">
                                            {transaction.portfolio?.account?.client?.name || 'N/A'}
                                        </div>
                                        <div className="text-sm text-theme-muted">
                                            {transaction.portfolio?.portfolio_name} ({transaction.portfolio?.portfolio_no})
                                        </div>
                                        <div className="text-xs text-theme-muted">
                                            Account: {transaction.portfolio?.account?.account_no}
                                        </div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getTransactionTypeColor(transaction.transaction_type)}>
                                            {transaction.transaction_type?.replace('_', ' ').toUpperCase()}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        {transaction.product ? (
                                            <div>
                                                <div className="font-medium text-theme-primary">{transaction.product.name}</div>
                                                <div className="text-sm text-theme-muted">({transaction.product.symbol})</div>
                                            </div>
                                        ) : (
                                            <span className="text-theme-muted">Cash/Margin</span>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        {transaction.quantity ? parseFloat(transaction.quantity).toFixed(6) : '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        {transaction.price ? `$${parseFloat(transaction.price).toFixed(2)}` : '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="font-semibold text-theme-primary">
                                        ${parseFloat(transaction.amount || 0).toFixed(2)}
                                        {transaction.fees > 0 && (
                                            <div className="text-xs text-theme-muted">Fees: ${parseFloat(transaction.fees).toFixed(2)}</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusColor(transaction.status)}>
                                            {transaction.status?.toUpperCase() || 'PENDING'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {transaction.transaction_date ? new Date(transaction.transaction_date).toLocaleDateString() : 'N/A'}
                                        {transaction.reference && (
                                            <div className="text-xs text-theme-muted">Ref: {transaction.reference}</div>
                                        )}
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
                                <ThemedTableRow>
                                    <ThemedTableCell colSpan={9} className="text-center py-8 text-theme-muted">
                                        No transactions found. <Link href="/transaction/new" className="text-theme-accent hover:underline">Create your first transaction</Link>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}