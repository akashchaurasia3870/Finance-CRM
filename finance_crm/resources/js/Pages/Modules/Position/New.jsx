import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function NewPosition({ clients = [], positionTypes = {} }) {
    const [data, setData] = useState({
        client_id: '',
        account_id: '',
        portfolio_id: '',
        position_type: '',
        product_id: '',
        quantity: 0,
        avg_price: 0,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [clientAccounts, setClientAccounts] = useState([]);
    const [accountPortfolios, setAccountPortfolios] = useState([]);
    const [typeProducts, setTypeProducts] = useState([]);
    const [loadingAccounts, setLoadingAccounts] = useState(false);
    const [loadingPortfolios, setLoadingPortfolios] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    // Load accounts when client changes
    useEffect(() => {
        if (data.client_id) {
            setLoadingAccounts(true);
            fetch(`/position/client/${data.client_id}/accounts`)
                .then(response => response.json())
                .then(accounts => {
                    setClientAccounts(accounts);
                    setData(prev => ({ ...prev, account_id: '', portfolio_id: '', product_id: '' }));
                    setAccountPortfolios([]);
                    setTypeProducts([]);
                })
                .catch(error => console.error('Error fetching accounts:', error))
                .finally(() => setLoadingAccounts(false));
        } else {
            setClientAccounts([]);
            setData(prev => ({ ...prev, account_id: '', portfolio_id: '', product_id: '' }));
            setAccountPortfolios([]);
            setTypeProducts([]);
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
                    setData(prev => ({ ...prev, portfolio_id: '', product_id: '' }));
                    setTypeProducts([]);
                })
                .catch(error => console.error('Error fetching portfolios:', error))
                .finally(() => setLoadingPortfolios(false));
        } else {
            setAccountPortfolios([]);
            setData(prev => ({ ...prev, portfolio_id: '', product_id: '' }));
            setTypeProducts([]);
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
                    setData(prev => ({ ...prev, product_id: '' }));
                })
                .catch(error => console.error('Error fetching products:', error))
                .finally(() => setLoadingProducts(false));
        } else {
            setTypeProducts([]);
            setData(prev => ({ ...prev, product_id: '' }));
        }
    }, [data.position_type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/position', data, {
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
                        <h1 className="text-2xl font-bold text-theme-primary">Create Security Position</h1>
                        <p className="text-theme-secondary">Add new security position</p>
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
                                {errors.client_id && <p className="text-red-500 text-sm mt-1">{errors.client_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Account *</label>
                                <ThemedSelect
                                    value={data.account_id}
                                    onChange={(e) => setData({...data, account_id: e.target.value})}
                                    className={errors.account_id ? 'border-red-500' : ''}
                                    disabled={!data.client_id || loadingAccounts}
                                    required
                                >
                                    <option value="">
                                        {!data.client_id ? 'Select Client First' : 
                                         loadingAccounts ? 'Loading Accounts...' : 'Select Account'}
                                    </option>
                                    {clientAccounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.account_type?.replace('_', ' ')} ({account.account_no})
                                        </option>
                                    ))}
                                </ThemedSelect>
                                {errors.account_id && <p className="text-red-500 text-sm mt-1">{errors.account_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Portfolio *</label>
                                <ThemedSelect
                                    value={data.portfolio_id}
                                    onChange={(e) => setData({...data, portfolio_id: e.target.value})}
                                    className={errors.portfolio_id ? 'border-red-500' : ''}
                                    disabled={!data.account_id || loadingPortfolios}
                                    required
                                >
                                    <option value="">
                                        {!data.account_id ? 'Select Account First' : 
                                         loadingPortfolios ? 'Loading Portfolios...' : 'Select Portfolio'}
                                    </option>
                                    {accountPortfolios.map((portfolio) => (
                                        <option key={portfolio.id} value={portfolio.id}>
                                            {portfolio.portfolio_name?.replace('_', ' ')} ({portfolio.portfolio_no})
                                        </option>
                                    ))}
                                </ThemedSelect>
                                {errors.portfolio_id && <p className="text-red-500 text-sm mt-1">{errors.portfolio_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Position Type *</label>
                                <ThemedSelect
                                    value={data.position_type}
                                    onChange={(e) => setData({...data, position_type: e.target.value})}
                                    className={errors.position_type ? 'border-red-500' : ''}
                                    required
                                >
                                    <option value="">Select Position Type</option>
                                    {Object.entries(positionTypes).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </ThemedSelect>
                                {errors.position_type && <p className="text-red-500 text-sm mt-1">{errors.position_type}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Product {data.position_type === 'cash' ? '(Not Required)' : '*'}
                                </label>
                                <ThemedSelect
                                    value={data.product_id}
                                    onChange={(e) => setData({...data, product_id: e.target.value})}
                                    className={errors.product_id ? 'border-red-500' : ''}
                                    disabled={!data.position_type || data.position_type === 'cash' || loadingProducts}
                                    required={data.position_type !== 'cash'}
                                >
                                    <option value="">
                                        {!data.position_type ? 'Select Position Type First' :
                                         data.position_type === 'cash' ? 'Not Required for Cash' :
                                         loadingProducts ? 'Loading Products...' : 'Select Product'}
                                    </option>
                                    {typeProducts.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} ({product.symbol})
                                        </option>
                                    ))}
                                </ThemedSelect>
                                {errors.product_id && <p className="text-red-500 text-sm mt-1">{errors.product_id}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Quantity *</label>
                                <ThemedInput
                                    type="number"
                                    step="0.000001"
                                    value={data.quantity}
                                    onChange={(e) => setData({...data, quantity: e.target.value})}
                                    className={errors.quantity ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Average Price *</label>
                                <ThemedInput
                                    type="number"
                                    step="0.000001"
                                    value={data.avg_price}
                                    onChange={(e) => setData({...data, avg_price: e.target.value})}
                                    className={errors.avg_price ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.avg_price && <p className="text-red-500 text-sm mt-1">{errors.avg_price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Market Value</label>
                                <ThemedInput
                                    type="text"
                                    value={`$${marketValue}`}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                                <p className="text-xs text-theme-secondary mt-1">Calculated: Quantity × Average Price</p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/position">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Position'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
