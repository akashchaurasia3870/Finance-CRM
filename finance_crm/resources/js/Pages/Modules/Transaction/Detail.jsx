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
                        <p className="text-theme-secondary">Complete transaction flow information</p>
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

                {/* Flow Hierarchy */}
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Transaction Flow</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Client</span>
                                <span className="text-theme-primary font-medium">
                                    {transaction.portfolio?.account?.client?.name || 'N/A'}
                                </span>
                            </div>
                            <span className="text-theme-muted">→</span>
                            <div className="flex items-center space-x-2">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Account</span>
                                <span className="text-theme-primary font-medium">
                                    {transaction.portfolio?.account?.account_no || 'N/A'}
                                </span>
                            </div>
                            <span className="text-theme-muted">→</span>
                            <div className="flex items-center space-x-2">
                                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">Portfolio</span>
                                <span className="text-theme-primary font-medium">
                                    {transaction.portfolio?.portfolio_name || 'N/A'}
                                </span>
                            </div>
                            <span className="text-theme-muted">→</span>
                            <div className="flex items-center space-x-2">
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Position</span>
                                <span className="text-theme-primary font-medium">
                                    {transaction.position?.product?.name || transaction.product?.name || 'Cash/Margin'}
                                </span>
                            </div>
                            <span className="text-theme-muted">→</span>
                            <div className="flex items-center space-x-2">
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Transaction</span>
                                <ThemedBadge variant={getTransactionTypeVariant(transaction.transaction_type)}>
                                    {transaction.transaction_type?.toUpperCase()}
                                </ThemedBadge>
                            </div>
                        </div>
                    </div>
                </ThemedCard>

                {/* Client Information */}
                {transaction.portfolio?.account?.client && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">1. Client Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Client Name</label>
                                    <p className="mt-1 text-sm text-theme-primary font-medium">{transaction.portfolio.account.client.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Email</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.client.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Phone</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.client.phone || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Company</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.client.company || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {/* Account Information */}
                {transaction.portfolio?.account && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">2. Account Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Account Number</label>
                                    <p className="mt-1 text-sm text-theme-primary font-medium">{transaction.portfolio.account.account_no}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Account Type</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.account.account_type}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Balance</label>
                                    <p className="mt-1 text-sm text-theme-primary">{formatCurrency(transaction.portfolio.account.balance)}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Status</label>
                                    <ThemedBadge variant={transaction.portfolio.account.status === 'active' ? 'success' : 'error'}>
                                        {transaction.portfolio.account.status?.toUpperCase()}
                                    </ThemedBadge>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {/* Portfolio Information */}
                {transaction.portfolio && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">3. Portfolio Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Portfolio Name</label>
                                    <p className="mt-1 text-sm text-theme-primary font-medium">{transaction.portfolio.portfolio_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Portfolio Number</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.portfolio.portfolio_no}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Total Value</label>
                                    <p className="mt-1 text-sm text-theme-primary">{formatCurrency(transaction.portfolio.total_value)}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Cash Balance</label>
                                    <p className="mt-1 text-sm text-theme-primary">{formatCurrency(transaction.portfolio.cash_balance)}</p>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {/* Position Information */}
                {(transaction.position || transaction.product) && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">4. Position Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Position Type</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.position?.position_type || 'New Position'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Current Quantity</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.position?.quantity || '0'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Average Price</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.position?.avg_price ? formatCurrency(transaction.position.avg_price) : 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Market Value</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.position?.market_value ? formatCurrency(transaction.position.market_value) : 'N/A'}</p>
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
                                    <p className="mt-1 text-sm text-theme-primary font-medium">{transaction.product.name}</p>
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

                {/* Transaction Details */}
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">5. Transaction Details</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Transaction Type</label>
                                <ThemedBadge variant={getTransactionTypeVariant(transaction.transaction_type)}>
                                    {transaction.transaction_type?.replace('_', ' ').toUpperCase()}
                                </ThemedBadge>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <ThemedBadge variant={
                                    transaction.status === 'completed' ? 'success' :
                                    transaction.status === 'pending' ? 'warning' : 'error'
                                }>
                                    {transaction.status?.toUpperCase()}
                                </ThemedBadge>
                            </div>
                            {transaction.quantity && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Quantity</label>
                                    <p className="mt-1 text-sm text-theme-primary font-medium">{parseFloat(transaction.quantity).toFixed(6)}</p>
                                </div>
                            )}
                            {transaction.price && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Price per Unit</label>
                                    <p className="mt-1 text-sm text-theme-primary font-medium">{formatCurrency(transaction.price)}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Amount</label>
                                <p className="mt-1 text-lg font-bold text-green-600">{formatCurrency(transaction.amount)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Fees</label>
                                <p className="mt-1 text-sm text-theme-primary">{formatCurrency(transaction.fees)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Net Amount</label>
                                <p className="mt-1 text-lg font-bold text-blue-600">{formatCurrency(transaction.net_amount)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Transaction Date</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {new Date(transaction.transaction_date).toLocaleString()}
                                </p>
                            </div>
                            {transaction.reference && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Reference</label>
                                    <p className="mt-1 text-sm text-theme-primary">{transaction.reference}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {new Date(transaction.created_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        {transaction.notes && (
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-theme-muted">Notes</label>
                                <p className="mt-1 text-sm text-theme-primary bg-theme-primary p-3 rounded border">{transaction.notes}</p>
                            </div>
                        )}
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}