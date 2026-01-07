import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';
import axios from 'axios';

export default function Edit({ auth, transaction, clients = [], accounts = [], portfolios = [], positions = [], products = [], transactionTypes = {} }) {
    const { data, setData, put, processing, errors } = useForm({
        client_id: transaction.portfolio?.account?.client_id || '',
        account_id: transaction.portfolio?.account_id || '',
        portfolio_id: transaction.portfolio_id || '',
        position_id: transaction.position_id || '',
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

    const [availableAccounts, setAvailableAccounts] = useState(accounts);
    const [availablePortfolios, setAvailablePortfolios] = useState(portfolios);
    const [availablePositions, setAvailablePositions] = useState(positions);
    const [availableProducts, setAvailableProducts] = useState(products);
    const [loading, setLoading] = useState({
        accounts: false,
        portfolios: false,
        positions: false
    });

    // Fetch accounts when client changes
    useEffect(() => {
        if (data.client_id && data.client_id !== transaction.portfolio?.account?.client_id) {
            setLoading(prev => ({ ...prev, accounts: true }));
            axios.get(`/transaction/client/${data.client_id}/accounts`)
                .then(response => {
                    setAvailableAccounts(response.data);
                    setData(prev => ({ ...prev, account_id: '', portfolio_id: '', position_id: '', product_id: '' }));
                    setAvailablePortfolios([]);
                    setAvailablePositions([]);
                    setAvailableProducts([]);
                })
                .catch(error => console.error('Error fetching accounts:', error))
                .finally(() => setLoading(prev => ({ ...prev, accounts: false })));
        }
    }, [data.client_id]);

    // Fetch portfolios when account changes
    useEffect(() => {
        if (data.account_id && data.account_id !== transaction.portfolio?.account_id) {
            setLoading(prev => ({ ...prev, portfolios: true }));
            axios.get(`/transaction/account/${data.account_id}/portfolios`)
                .then(response => {
                    setAvailablePortfolios(response.data);
                    setData(prev => ({ ...prev, portfolio_id: '', position_id: '', product_id: '' }));
                    setAvailablePositions([]);
                    setAvailableProducts([]);
                })
                .catch(error => console.error('Error fetching portfolios:', error))
                .finally(() => setLoading(prev => ({ ...prev, portfolios: false })));
        }
    }, [data.account_id]);

    // Fetch positions and products when portfolio changes
    useEffect(() => {
        if (data.portfolio_id && data.portfolio_id !== transaction.portfolio_id) {
            setLoading(prev => ({ ...prev, positions: true }));
            axios.get(`/transaction/portfolio/${data.portfolio_id}/positions`)
                .then(response => {
                    setAvailablePositions(response.data.positions || []);
                    setAvailableProducts(response.data.products || []);
                    setData(prev => ({ ...prev, position_id: '', product_id: '' }));
                })
                .catch(error => console.error('Error fetching positions:', error))
                .finally(() => setLoading(prev => ({ ...prev, positions: false })));
        }
    }, [data.portfolio_id]);

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
    const requiresPosition = ['buy', 'sell'].includes(data.transaction_type);

    return (
        <Layout>
            <Head title="Edit Transaction" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Transaction</h1>
                        <p className="text-theme-secondary">Update transaction details following the flow: Client → Account → Portfolio → Position → Transaction</p>
                    </div>
                    <a href="/transaction">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </a>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Transaction Flow</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Select Client */}
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    1. Select Client *
                                </label>
                                <select
                                    value={data.client_id}
                                    onChange={(e) => setData('client_id', e.target.value)}
                                    className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent ${errors.client_id ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Choose a client</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>
                                            {client.name} - {client.email}
                                        </option>
                                    ))}
                                </select>
                                {errors.client_id && <p className="text-red-500 text-sm mt-1">{errors.client_id}</p>}
                            </div>

                            {/* Step 2: Select Account */}
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    2. Select Account *
                                </label>
                                <select
                                    value={data.account_id}
                                    onChange={(e) => setData('account_id', e.target.value)}
                                    disabled={!data.client_id || loading.accounts}
                                    className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent disabled:opacity-50 ${errors.account_id ? 'border-red-500' : ''}`}
                                >
                                    <option value="">
                                        {loading.accounts ? 'Loading accounts...' : 
                                         !data.client_id ? 'Select client first' : 'Choose an account'}
                                    </option>
                                    {availableAccounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.account_no} - {account.account_type} (Balance: ${account.balance})
                                        </option>
                                    ))}
                                </select>
                                {errors.account_id && <p className="text-red-500 text-sm mt-1">{errors.account_id}</p>}
                            </div>

                            {/* Step 3: Select Portfolio */}
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    3. Select Portfolio *
                                </label>
                                <select
                                    value={data.portfolio_id}
                                    onChange={(e) => setData('portfolio_id', e.target.value)}
                                    disabled={!data.account_id || loading.portfolios}
                                    className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent disabled:opacity-50 ${errors.portfolio_id ? 'border-red-500' : ''}`}
                                >
                                    <option value="">
                                        {loading.portfolios ? 'Loading portfolios...' : 
                                         !data.account_id ? 'Select account first' : 'Choose a portfolio'}
                                    </option>
                                    {availablePortfolios.map((portfolio) => (
                                        <option key={portfolio.id} value={portfolio.id}>
                                            {portfolio.portfolio_name} ({portfolio.portfolio_no})
                                        </option>
                                    ))}
                                </select>
                                {errors.portfolio_id && <p className="text-red-500 text-sm mt-1">{errors.portfolio_id}</p>}
                            </div>

                            {/* Step 4: Transaction Type */}
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    4. Transaction Type *
                                </label>
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

                            {/* Step 5: Select Position (for buy/sell) */}
                            {requiresPosition && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        5. Select Existing Position (Optional for new positions)
                                    </label>
                                    <select
                                        value={data.position_id}
                                        onChange={(e) => setData('position_id', e.target.value)}
                                        disabled={!data.portfolio_id || loading.positions}
                                        className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent disabled:opacity-50`}
                                    >
                                        <option value="">
                                            {loading.positions ? 'Loading positions...' : 
                                             !data.portfolio_id ? 'Select portfolio first' : 'Create new position or select existing'}
                                        </option>
                                        {availablePositions.map((position) => (
                                            <option key={position.id} value={position.id}>
                                                {position.product?.name || 'Cash'} - {position.position_type} (Qty: {position.quantity})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Step 6: Select Product (for transactions requiring products) */}
                            {requiresProduct && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        {requiresPosition ? '6. Select Product *' : '5. Select Product *'}
                                    </label>
                                    <select
                                        value={data.product_id}
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        disabled={!data.portfolio_id}
                                        className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent disabled:opacity-50 ${errors.product_id ? 'border-red-500' : ''}`}
                                    >
                                        <option value="">
                                            {!data.portfolio_id ? 'Select portfolio first' : 'Choose a product'}
                                        </option>
                                        {availableProducts.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} ({product.symbol}) - {product.product_type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.product_id && <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>}
                                </div>
                            )}

                            {/* Transaction Details */}
                            <div className="border-t border-theme pt-6">
                                <h4 className="text-md font-medium text-theme-primary mb-4">Transaction Details</h4>
                                
                                {requiresQuantityPrice && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-theme-primary mb-2">Notes</label>
                                    <textarea
                                        rows="3"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className={`w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent ${errors.notes ? 'border-red-500' : ''}`}
                                    />
                                    {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-6 border-t border-theme">
                                <a href="/transaction">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </a>
                                <ThemedButton 
                                    type="submit" 
                                    variant="primary" 
                                    disabled={processing || !data.client_id || !data.account_id || !data.portfolio_id}
                                >
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
