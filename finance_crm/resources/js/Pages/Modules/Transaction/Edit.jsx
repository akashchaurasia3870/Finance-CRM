import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function Edit({ auth, transaction, portfolios = [], products = [], transactionTypes = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        portfolio_id: transaction.portfolio_id || '',
        product_id: transaction.product_id || '',
        transaction_type: transaction.transaction_type || 'deposit',
        quantity: transaction.quantity || '',
        price: transaction.price || '',
        amount: transaction.amount || '',
        fees: transaction.fees || '0',
        transaction_date: transaction.transaction_date ? transaction.transaction_date.split('T')[0] : '',
        reference: transaction.reference || '',
        notes: transaction.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/transaction/${transaction.id}`);
    };

    const calculateAmount = () => {
        if (data.quantity && data.price) {
            const amount = parseFloat(data.quantity) * parseFloat(data.price);
            setData('amount', amount.toFixed(2));
        }
    };

    const requiresProduct = ['buy', 'sell', 'dividend'].includes(data.transaction_type);
    const requiresQuantityPrice = ['buy', 'sell'].includes(data.transaction_type);

    return (
        <Layout>
            <Head title="Edit Transaction" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Transaction</h1>
                        <p className="text-theme-secondary">Update transaction details</p>
                    </div>
                    <a href="/transaction">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </a>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Transaction Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Portfolio *</label>
                                <select
                                    value={data.portfolio_id}
                                    onChange={(e) => setData('portfolio_id', e.target.value)}
                                    className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent ${errors.portfolio_id ? 'border-red-500' : ''}`}
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
                                <label className="block text-sm font-medium text-theme-primary mb-2">Transaction Type *</label>
                                <select
                                    value={data.transaction_type}
                                    onChange={(e) => setData('transaction_type', e.target.value)}
                                    className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent ${errors.transaction_type ? 'border-red-500' : ''}`}
                                >
                                    {Object.entries(transactionTypes).map(([key, label]) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                                {errors.transaction_type && <p className="text-red-500 text-sm mt-1">{errors.transaction_type}</p>}
                            </div>

                            {requiresProduct && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">Product *</label>
                                    <select
                                        value={data.product_id}
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent ${errors.product_id ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">Select Product</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} ({product.symbol}) - {product.product_type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.product_id && <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>}
                                </div>
                            )}

                            {requiresQuantityPrice && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-primary mb-2">Quantity *</label>
                                        <ThemedInput
                                            type="number"
                                            step="0.000001"
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', e.target.value)}
                                            onBlur={calculateAmount}
                                            className={errors.quantity ? 'border-red-500' : ''}
                                        />
                                        {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-theme-primary mb-2">Price per Unit *</label>
                                        <ThemedInput
                                            type="number"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            onBlur={calculateAmount}
                                            className={errors.price ? 'border-red-500' : ''}
                                        />
                                        {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Amount *</label>
                                <ThemedInput
                                    type="number"
                                    step="0.01"
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className={errors.amount ? 'border-red-500' : ''}
                                />
                                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Fees</label>
                                <ThemedInput
                                    type="number"
                                    step="0.01"
                                    value={data.fees}
                                    onChange={(e) => setData('fees', e.target.value)}
                                    className={errors.fees ? 'border-red-500' : ''}
                                />
                                {errors.fees && <p className="text-red-500 text-sm mt-1">{errors.fees}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Transaction Date</label>
                                <ThemedInput
                                    type="date"
                                    value={data.transaction_date}
                                    onChange={(e) => setData('transaction_date', e.target.value)}
                                    className={errors.transaction_date ? 'border-red-500' : ''}
                                />
                                {errors.transaction_date && <p className="text-red-500 text-sm mt-1">{errors.transaction_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Reference</label>
                                <ThemedInput
                                    type="text"
                                    value={data.reference}
                                    onChange={(e) => setData('reference', e.target.value)}
                                    className={errors.reference ? 'border-red-500' : ''}
                                />
                                {errors.reference && <p className="text-red-500 text-sm mt-1">{errors.reference}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Notes</label>
                                <textarea
                                    rows="3"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent ${errors.notes ? 'border-red-500' : ''}`}
                                />
                                {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <a href="/transaction">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </a>
                                <ThemedButton type="submit" variant="primary" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Transaction'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
