import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell } from '@/Components/ThemedComponents';

export default function PortfolioDetail({ portfolio, total_value, cash_balance, margin_used, stock_positions, recent_transactions }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this portfolio?')) {
            router.delete(`/portfolio/${portfolio.id}`, {
                onSuccess: () => {
                    router.visit('/portfolio');
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

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">{portfolio.portfolio_name}</h1>
                        <p className="text-theme-secondary">Portfolio #{portfolio.portfolio_no}</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/portfolio">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/portfolio/${portfolio.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Total Value</h3>
                        <p className="text-2xl font-bold text-green-600">{formatCurrency(total_value)}</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Cash Balance</h3>
                        <p className="text-2xl font-bold text-blue-600">{formatCurrency(cash_balance)}</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Margin Used</h3>
                        <p className="text-2xl font-bold text-red-600">{formatCurrency(margin_used)}</p>
                    </ThemedCard>
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-medium text-theme-primary">Status</h3>
                        <ThemedBadge variant={
                            portfolio.status === 'active' ? 'success' :
                            portfolio.status === 'inactive' ? 'warning' : 'error'
                        }>
                            {portfolio.status}
                        </ThemedBadge>
                    </ThemedCard>
                </div>

                {/* Client Information */}
                {portfolio.client && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Client Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Client Name</label>
                                    <p className="mt-1 text-sm text-theme-primary">{portfolio.client.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Email</label>
                                    <p className="mt-1 text-sm text-theme-primary">{portfolio.client.email}</p>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {/* Stock Positions */}
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Stock Holdings</h3>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Product</ThemedTableCell>
                                <ThemedTableCell header>Quantity</ThemedTableCell>
                                <ThemedTableCell header>Avg Price</ThemedTableCell>
                                <ThemedTableCell header>Current Value</ThemedTableCell>
                                <ThemedTableCell header>P&L</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {stock_positions && stock_positions.length > 0 ? (
                                stock_positions.map((position, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{position.product?.name}</div>
                                            <div className="text-sm text-theme-muted">{position.product?.symbol}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {position.quantity}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {formatCurrency(position.avg_price)}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {formatCurrency(position.current_value)}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <span className={position.unrealized_pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                {formatCurrency(position.unrealized_pnl)}
                                            </span>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))
                            ) : (
                                <ThemedTableRow>
                                    <ThemedTableCell colSpan="5" className="text-center text-theme-muted">
                                        No stock positions found
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>

                {/* Recent Transactions */}
                <ThemedCard>
                    <div className="p-4 border-b border-theme flex justify-between items-center">
                        <h3 className="text-lg font-medium text-theme-primary">Recent Transactions</h3>
                        <Link href="/transaction/new">
                            <ThemedButton variant="primary" className="text-sm">New Transaction</ThemedButton>
                        </Link>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Date</ThemedTableCell>
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Product</ThemedTableCell>
                                <ThemedTableCell header>Amount</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {recent_transactions && recent_transactions.length > 0 ? (
                                recent_transactions.map((transaction) => (
                                    <ThemedTableRow key={transaction.id}>
                                        <ThemedTableCell className="text-theme-primary">
                                            {new Date(transaction.transaction_date).toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant="info">
                                                {transaction.transaction_type}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {transaction.product?.name || 'N/A'}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {formatCurrency(transaction.amount)}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={
                                                transaction.status === 'completed' ? 'success' :
                                                transaction.status === 'pending' ? 'warning' : 'error'
                                            }>
                                                {transaction.status}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))
                            ) : (
                                <ThemedTableRow>
                                    <ThemedTableCell colSpan="5" className="text-center text-theme-muted">
                                        No transactions found
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
