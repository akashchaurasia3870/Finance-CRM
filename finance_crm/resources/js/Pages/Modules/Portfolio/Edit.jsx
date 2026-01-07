import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function EditPortfolio({ portfolio, clients = [] }) {
    const [data, setData] = useState({
        portfolio_name: portfolio.portfolio_name || '',
        portfolio_no: portfolio.portfolio_no || '',
        client_id: portfolio.account?.client_id || '',
        account_id: portfolio.account_id || '',
        status: portfolio.status || 'active',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [clientAccounts, setClientAccounts] = useState([]);
    const [loadingAccounts, setLoadingAccounts] = useState(false);

    const portfolioTypes = {
        'cash_portfolio': { name: 'Cash Portfolio', number: '#1001' },
        'stock_portfolio': { name: 'Stock Portfolio', number: '#1002' },
        'bond_portfolio': { name: 'Bond Portfolio', number: '#1003' },
        'mutual_fund_portfolio': { name: 'Mutual Fund Portfolio', number: '#1004' },
        'etf_portfolio': { name: 'ETF Portfolio', number: '#1005' },
        'retirement_portfolio': { name: 'Retirement Portfolio', number: '#1006' },
        'margin_portfolio': { name: 'Margin Portfolio', number: '#1007' },
        'options_portfolio': { name: 'Options Portfolio', number: '#1008' },
        'forex_portfolio': { name: 'Forex Portfolio', number: '#1009' },
        'crypto_portfolio': { name: 'Crypto Portfolio', number: '#1010' }
    };

    useEffect(() => {
        if (data.portfolio_name && portfolioTypes[data.portfolio_name]) {
            setData(prev => ({
                ...prev,
                portfolio_no: portfolioTypes[data.portfolio_name].number
            }));
        }
    }, [data.portfolio_name]);

    useEffect(() => {
        if (data.client_id) {
            setLoadingAccounts(true);
            fetch(`/portfolio/client/${data.client_id}/accounts`)
                .then(response => response.json())
                .then(accounts => {
                    setClientAccounts(accounts);
                    if (!accounts.find(acc => acc.id == data.account_id)) {
                        setData(prev => ({ ...prev, account_id: '' }));
                    }
                })
                .catch(error => console.error('Error fetching accounts:', error))
                .finally(() => setLoadingAccounts(false));
        } else {
            setClientAccounts([]);
            setData(prev => ({ ...prev, account_id: '' }));
        }
    }, [data.client_id]);

    // Load initial accounts if client is already selected
    useEffect(() => {
        if (portfolio.account?.client_id) {
            setLoadingAccounts(true);
            fetch(`/portfolio/client/${portfolio.account.client_id}/accounts`)
                .then(response => response.json())
                .then(accounts => setClientAccounts(accounts))
                .catch(error => console.error('Error fetching accounts:', error))
                .finally(() => setLoadingAccounts(false));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/portfolio/${portfolio.id}`, data, {
            onSuccess: () => {
                router.visit('/portfolio');
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
                <div className="flex items-center space-x-4">
                    <Link href="/portfolio">
                        <ThemedButton variant="ghost">← Back</ThemedButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Portfolio</h1>
                        <p className="text-theme-secondary">Update portfolio information</p>
                    </div>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Portfolio Type *</label>
                                <ThemedSelect
                                    value={data.portfolio_name}
                                    onChange={(e) => setData({...data, portfolio_name: e.target.value})}
                                    className={errors.portfolio_name ? 'border-red-500' : ''}
                                    required
                                >
                                    <option value="">Select Portfolio Type</option>
                                    {Object.entries(portfolioTypes).map(([key, type]) => (
                                        <option key={key} value={key}>{type.name}</option>
                                    ))}
                                </ThemedSelect>
                                {errors.portfolio_name && <p className="text-red-500 text-sm mt-1">{errors.portfolio_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Portfolio Number</label>
                                <ThemedInput
                                    type="text"
                                    value={data.portfolio_no}
                                    readOnly
                                    className="bg-gray-100 cursor-not-allowed"
                                />
                                <p className="text-xs text-theme-secondary mt-1">Auto-assigned based on portfolio type</p>
                            </div>

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
                                <label className="block text-sm font-medium text-theme-primary mb-2">Account</label>
                                <ThemedSelect
                                    value={data.account_id}
                                    onChange={(e) => setData({...data, account_id: e.target.value})}
                                    disabled={!data.client_id || loadingAccounts}
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
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Status</label>
                                <ThemedSelect
                                    value={data.status}
                                    onChange={(e) => setData({...data, status: e.target.value})}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </ThemedSelect>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/portfolio">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Portfolio'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
