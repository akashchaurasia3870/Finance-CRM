import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function TransactionDetail({ transaction }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            router.delete(`/transaction/${transaction.id}`, {
                onSuccess: () => {
                    router.visit('/transaction');
                }
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount || 0);
    };

    const getTransactionTypeVariant = (type) => {
        const variants = {
            'buy': 'success',
            'sell': 'error',
            'deposit': 'info',
            'withdraw': 'warning',
            'margin_use': 'info',
            'margin_repay': 'success',
            'dividend': 'warning'
        };
        return variants[type] || 'info';
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Transaction Details</h1>
                        <p className="text-theme-secondary">Reference: {transaction.reference || 'N/A'}</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/transaction">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/transaction/${transaction.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                {/* Transaction Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Transaction Type</h3>
                        <div className="mt-2">
                            <ThemedBadge variant={getTransactionTypeVariant(transaction.transaction_type)}>
                                {transaction.transaction_type}
                            </ThemedBadge>
                        </div>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Amount</h3>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(transaction.amount)}</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Net Amount</h3>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(transaction.net_amount)}</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Status</h3>
                        <div className="mt-2">
                            <ThemedBadge variant={
                                transaction.status === 'completed' ? 'success' :
                                transaction.status === 'pending' ? 'warning' : 'error'
                            }>
                                {transaction.status}
                            </ThemedBadge>
                        </div>
                    </ThemedCard>
                </div>

                {/* Transaction Details */}
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Transaction Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Transaction Date</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {new Date(transaction.transaction_date).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {new Date(transaction.created_at).toLocaleString()}
                                </p>
                            </div>
                            {transaction.quantity && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Quantity</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.quantity}</p>
                                </div>
                            )}
                            {transaction.price && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Price per Unit</label>
                                    <p className="mt-1 text-sm text-theme-primary">{formatCurrency(transaction.price)}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Fees</label>
                                <p className="mt-1 text-sm text-theme-primary">{formatCurrency(transaction.fees)}</p>
                            </div>
                        </div>
                        {transaction.notes && (
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Notes</label>
                                <p className="mt-1 text-sm text-theme-primary">{transaction.notes}</p>
                            </div>
                        )}
                    </div>
                </ThemedCard>

                {/* Portfolio Information */}
                {transaction.portfolio && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Client & Account Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                {transaction.portfolio.account?.client && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Client Name</label>
                                            <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.client.name}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Client Email</label>
                                            <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.client.email}</p>
                                        </div>
                                    </>
                                )}
                                {transaction.portfolio.account && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Account Number</label>
                                            <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.account_no}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Account Type</label>
                                            <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.account_type}</p>
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Portfolio Name</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.portfolio_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Portfolio Number</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.portfolio_no}</p>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {/* Product Information */}
                {transaction.product && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Product Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Product Name</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.product.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Symbol</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.product.symbol}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Product Type</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.product.product_type}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Sector</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.product.sector || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}
            </div>
        </Layout>
    );
}
