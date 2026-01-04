import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function ProductDetail({ product }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/product/${product.id}`, {
                onSuccess: () => {
                    router.visit('/product');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Product Details</h1>
                        <p className="text-theme-secondary">View product information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/product">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/product/${product.id}/edit`}>
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
                                <label className="block text-sm font-medium text-theme-muted">Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{product.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Symbol</label>
                                <p className="mt-1 text-sm text-theme-primary">{product.symbol || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Product Type</label>
                                <div className="mt-1">
                                    <ThemedBadge variant="info">
                                        {product.product_type}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Sector</label>
                                <p className="mt-1 text-sm text-theme-primary">{product.sector || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Risk Level</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={
                                        product.risk_level === 'low' ? 'success' :
                                        product.risk_level === 'medium' ? 'warning' :
                                        product.risk_level === 'high' ? 'error' : 'error'
                                    }>
                                        {product.risk_level}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={product.is_active ? 'success' : 'error'}>
                                        {product.is_active ? 'Active' : 'Inactive'}
                                    </ThemedBadge>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(product.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(product.updated_at).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        {product.description && (
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Description</label>
                                <p className="mt-1 text-sm text-theme-primary">{product.description}</p>
                            </div>
                        )}
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
