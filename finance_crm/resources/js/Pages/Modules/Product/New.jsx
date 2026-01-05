import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function NewProduct() {
    const [data, setData] = useState({
        name: '',
        symbol: '',
        product_type: 'stock',
        description: '',
        sector: '',
        risk_level: 'medium',
        is_active: true,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/product', data, {
            onSuccess: () => {
                router.visit('/product');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Create Product</h1>
                        <p className="text-theme-secondary">Add a new product to the system</p>
                    </div>
                    <Link href="/product">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Product Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Product Name *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({...data, name: e.target.value})}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Symbol
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.symbol}
                                    onChange={(e) => setData({...data, symbol: e.target.value})}
                                />
                                {errors.symbol && <p className="text-red-500 text-sm mt-1">{errors.symbol}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Product Type *
                                </label>
                                <select
                                    value={data.product_type}
                                    onChange={(e) => setData({...data, product_type: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    required
                                >
                                    <option value="stock">Stock</option>
                                    <option value="mutual_fund">Mutual Fund</option>
                                    <option value="etf">ETF</option>
                                    <option value="bond">Bond</option>
                                    <option value="derivative">Derivative</option>
                                    <option value="margin">Margin</option>
                                    <option value="commodity">Commodity</option>
                                    <option value="forex">Forex</option>
                                    <option value="crypto">Crypto</option>
                                </select>
                                {errors.product_type && <p className="text-red-500 text-sm mt-1">{errors.product_type}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Sector
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.sector}
                                    onChange={(e) => setData({...data, sector: e.target.value})}
                                />
                                {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Risk Level *
                                </label>
                                <select
                                    value={data.risk_level}
                                    onChange={(e) => setData({...data, risk_level: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    required
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="very_high">Very High</option>
                                </select>
                                {errors.risk_level && <p className="text-red-500 text-sm mt-1">{errors.risk_level}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                    rows="4"
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData({...data, is_active: e.target.checked})}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-theme-primary">
                                    Active
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/product">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
