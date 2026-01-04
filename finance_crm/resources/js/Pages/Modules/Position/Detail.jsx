import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function PositionDetail({ position }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this position?')) {
            router.delete(`/position/${position.id}`, {
                onSuccess: () => {
                    router.visit('/position');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Position Details</h1>
                        <p className="text-theme-secondary">View security position information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/position">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/position/${position.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Basic Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Portfolio</label>
                                <p className="mt-1 text-sm text-theme-primary">{position.portfolio?.portfolio_name}</p>
                                <p className="text-xs text-theme-secondary">#{position.portfolio?.portfolio_no}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Product</label>
                                <p className="mt-1 text-sm text-theme-primary">{position.product?.name}</p>
                                <p className="text-xs text-theme-secondary">{position.product?.symbol}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Quantity</label>
                                <p className="mt-1 text-sm text-theme-primary font-semibold">{position.quantity}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Average Price</label>
                                <p className="mt-1 text-sm text-theme-primary font-semibold">{formatCurrency(position.avg_price)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Market Value</label>
                                <p className="mt-1 text-lg text-theme-primary font-bold">{formatCurrency(position.market_value)}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Last Updated</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(position.last_updated).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(position.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(position.updated_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </ThemedCard>

                {position.portfolio && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Portfolio Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Portfolio Name</label>
                                    <p className="mt-1 text-sm text-theme-primary">{position.portfolio.portfolio_name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Portfolio Number</label>
                                    <p className="mt-1 text-sm text-theme-primary">{position.portfolio.portfolio_no}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Status</label>
                                    <div className="mt-1">
                                        <ThemedBadge variant={position.portfolio.status === 'active' ? 'success' : 'error'}>
                                            {position.portfolio.status}
                                        </ThemedBadge>
                                    </div>
                                </div>
                                {position.portfolio.account && (
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Account</label>
                                        <p className="mt-1 text-sm text-theme-primary">{position.portfolio.account.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {position.product && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Product Information</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Product Name</label>
                                    <p className="mt-1 text-sm text-theme-primary">{position.product.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Symbol</label>
                                    <p className="mt-1 text-sm text-theme-primary">{position.product.symbol}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Product Type</label>
                                    <div className="mt-1">
                                        <ThemedBadge variant="info">
                                            {position.product.product_type}
                                        </ThemedBadge>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Risk Level</label>
                                    <div className="mt-1">
                                        <ThemedBadge variant={
                                            position.product.risk_level === 'low' ? 'success' :
                                            position.product.risk_level === 'medium' ? 'warning' : 'error'
                                        }>
                                            {position.product.risk_level}
                                        </ThemedBadge>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}
            </div>
        </Layout>
    );
}
