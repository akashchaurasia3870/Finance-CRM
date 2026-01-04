import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function EditPosition({ position, portfolios = [], products = [] }) {
    const [data, setData] = useState({
        portfolio_id: position.portfolio_id || '',
        product_id: position.product_id || '',
        quantity: position.quantity || 0,
        avg_price: position.avg_price || 0,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/position/${position.id}`, data, {
            onSuccess: () => {
                router.visit('/position');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    const marketValue = (data.quantity * data.avg_price).toFixed(2);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Position</h1>
                        <p className="text-theme-secondary">Update security position information</p>
                    </div>
                    <Link href="/position">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Position Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Portfolio *
                                </label>
                                <select
                                    value={data.portfolio_id}
                                    onChange={(e) => setData({...data, portfolio_id: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    required
                                >
                                    <option value="">Select Portfolio</option>
                                    {portfolios.map((portfolio) => (
                                        <option key={portfolio.id} value={portfolio.id}>
                                            {portfolio.portfolio_name} ({portfolio.portfolio_no})
                                        </option>
                                    ))}
                                </select>
                                {errors.portfolio_id && <p className="text-red-500 text-sm mt-1">{errors.portfolio_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Product *
                                </label>
                                <select
                                    value={data.product_id}
                                    onChange={(e) => setData({...data, product_id: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    required
                                >
                                    <option value="">Select Product</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} ({product.symbol})
                                        </option>
                                    ))}
                                </select>
                                {errors.product_id && <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Quantity *
                                </label>
                                <ThemedInput
                                    type="number"
                                    step="0.000001"
                                    value={data.quantity}
                                    onChange={(e) => setData({...data, quantity: e.target.value})}
                                    required
                                />
                                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Average Price *
                                </label>
                                <ThemedInput
                                    type="number"
                                    step="0.000001"
                                    value={data.avg_price}
                                    onChange={(e) => setData({...data, avg_price: e.target.value})}
                                    required
                                />
                                {errors.avg_price && <p className="text-red-500 text-sm mt-1">{errors.avg_price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Market Value (Calculated)
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={`$${marketValue}`}
                                    disabled
                                    className="bg-theme-muted"
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/position">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
