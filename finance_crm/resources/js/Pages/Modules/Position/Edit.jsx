import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function EditPosition({ position, clients = [], positionTypes = {} }) {
    const [data, setData] = useState({
        client_id: position.portfolio?.account?.client_id || '',
        account_id: position.portfolio?.account_id || '',
        portfolio_id: position.portfolio_id || '',
        position_type: position.position_type || '',
        product_id: position.product_id || '',
        quantity: position.quantity || 0,
        avg_price: position.avg_price || 0,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [clientAccounts, setClientAccounts] = useState([]);
    const [accountPortfolios, setAccountPortfolios] = useState([]);
    const [typeProducts, setTypeProducts] = useState([]);
    const [loadingAccounts, setLoadingAccounts] = useState(false);
    const [loadingPortfolios, setLoadingPortfolios] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // Load initial data
    useEffect(() => {
        if (position.portfolio?.account?.client_id) {
            // Load accounts for the client
            fetch(`/position/client/${position.portfolio.account.client_id}/accounts`)
                .then(response => response.json())
                .then(accounts => setClientAccounts(accounts));
            
            // Load portfolios for the account
            if (position.portfolio?.account_id) {
                fetch(`/position/account/${position.portfolio.account_id}/portfolios`)
                    .then(response => response.json())
                    .then(portfolios => setAccountPortfolios(portfolios));
            }
            
            // Load products for the position type
            if (position.position_type && position.position_type !== 'cash') {
                fetch(`/position/type/${position.position_type}/products`)
                    .then(response => response.json())
                    .then(products => setTypeProducts(products));
            }
        }
    }, []);

    // Load accounts when client changes
    useEffect(() => {
        if (data.client_id) {
            setLoadingAccounts(true);
            fetch(`/position/client/${data.client_id}/accounts`)
                .then(response => response.json())
                .then(accounts => {
                    setClientAccounts(accounts);
                    if (!accounts.find(acc => acc.id == data.account_id)) {
                        setData(prev => ({ ...prev, account_id: '', portfolio_id: '', product_id: '' }));
                        setAccountPortfolios([]);
                        setTypeProducts([]);
                    }
                })
                .finally(() => setLoadingAccounts(false));
        }
    }, [data.client_id]);

    // Load portfolios when account changes
    useEffect(() => {
        if (data.account_id) {
            setLoadingPortfolios(true);
            fetch(`/position/account/${data.account_id}/portfolios`)
                .then(response => response.json())
                .then(portfolios => {
                    setAccountPortfolios(portfolios);
                    if (!portfolios.find(p => p.id == data.portfolio_id)) {
                        setData(prev => ({ ...prev, portfolio_id: '', product_id: '' }));
                        setTypeProducts([]);
                    }
                })
                .finally(() => setLoadingPortfolios(false));
        }
    }, [data.account_id]);

    // Load products when position type changes
    useEffect(() => {
        if (data.position_type && data.position_type !== 'cash') {
            setLoadingProducts(true);
            fetch(`/position/type/${data.position_type}/products`)
                .then(response => response.json())
                .then(products => {
                    setTypeProducts(products);
                    if (!products.find(p => p.id == data.product_id)) {
                        setData(prev => ({ ...prev, product_id: '' }));
                    }
                })
                .finally(() => setLoadingProducts(false));
        } else {
            setTypeProducts([]);
            setData(prev => ({ ...prev, product_id: '' }));
        }
    }, [data.position_type]);

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
                <div className="flex items-center space-x-4">
                    <Link href="/position">
                        <ThemedButton variant="ghost">← Back</ThemedButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Security Position</h1>
                        <p className="text-theme-secondary">Update security position information</p>
                    </div>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Client *</label>
                                <ThemedSelect
                                    value={data.client_id}
                                    onChange={(e) => setData({...data, client_id: e.target.value})}
                                    className={errors.client_id ? 'border-red-500' : ''}
                                    required
                                >
                                    <option value="">Select Client</option>
                                    {clients.map((client) => (
                                        <option key={client.id} value={client.id}>{client.name}</option>
                                    ))}
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Account *</label>
                                <ThemedSelect
                                    value={data.account_id}
                                    onChange={(e) => setData({...data, account_id: e.target.value})}
                                    disabled={!data.client_id || loadingAccounts}
                                    required
                                >
                                    <option value="">
                                        {!data.client_id ? 'Select Client First' : 
                                         loadingAccounts ? 'Loading...' : 'Select Account'}
                                    </option>
                                    {clientAccounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.account_type?.replace('_', ' ')} ({account.account_no})
                                        </option>
                                    ))}
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Portfolio *</label>
                                <ThemedSelect
                                    value={data.portfolio_id}
                                    onChange={(e) => setData({...data, portfolio_id: e.target.value})}
                                    disabled={!data.account_id || loadingPortfolios}
                                    required
                                >
                                    <option value="">
                                        {!data.account_id ? 'Select Account First' : 
                                         loadingPortfolios ? 'Loading...' : 'Select Portfolio'}
                                    </option>
                                    {accountPortfolios.map((portfolio) => (
                                        <option key={portfolio.id} value={portfolio.id}>
                                            {portfolio.portfolio_name?.replace('_', ' ')} ({portfolio.portfolio_no})
                                        </option>
                                    ))}
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Position Type *</label>
                                <ThemedSelect
                                    value={data.position_type}
                                    onChange={(e) => setData({...data, position_type: e.target.value})}
                                    required
                                >
                                    <option value="">Select Position Type</option>
                                    {Object.entries(positionTypes).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Product {data.position_type === 'cash' ? '(Not Required)' : '*'}
                                </label>
                                <ThemedSelect
                                    value={data.product_id}
                                    onChange={(e) => setData({...data, product_id: e.target.value})}
                                    disabled={!data.position_type || data.position_type === 'cash' || loadingProducts}
                                    required={data.position_type !== 'cash'}
                                >
                                    <option value="">
                                        {!data.position_type ? 'Select Position Type First' :
                                         data.position_type === 'cash' ? 'Not Required for Cash' :
                                         loadingProducts ? 'Loading...' : 'Select Product'}
                                    </option>
                                    {typeProducts.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} ({product.symbol})
                                        </option>
                                    ))}
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Quantity *</label>
                                <ThemedInput
                                    type="number"
                                    step="0.000001"
                                    value={data.quantity}
                                    onChange={(e) => setData({...data, quantity: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Average Price *</label>
                                <ThemedInput
                                    type="number"
                                    step="0.000001"
                                    value={data.avg_price}
                                    onChange={(e) => setData({...data, avg_price: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Market Value</label>
                                <ThemedInput
                                    type="text"
                                    value={`$${marketValue}`}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/position">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Position'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
