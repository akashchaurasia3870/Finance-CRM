import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function PortfolioView({ portfolios = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const portfolioTypes = {
        'cash_portfolio': 'Cash Portfolio',
        'stock_portfolio': 'Stock Portfolio',
        'bond_portfolio': 'Bond Portfolio',
        'mutual_fund_portfolio': 'Mutual Fund Portfolio',
        'etf_portfolio': 'ETF Portfolio',
        'retirement_portfolio': 'Retirement Portfolio',
        'margin_portfolio': 'Margin Portfolio',
        'options_portfolio': 'Options Portfolio',
        'forex_portfolio': 'Forex Portfolio',
        'crypto_portfolio': 'Crypto Portfolio'
    };

    const filteredPortfolios = portfolios.filter(portfolio => 
        (portfolio.portfolio_name && portfolioTypes[portfolio.portfolio_name]?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (portfolio.portfolio_no && portfolio.portfolio_no.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this portfolio?')) {
            router.delete(`/portfolio/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Portfolios</h1>
                        <p className="text-theme-secondary">Manage investment portfolios</p>
                    </div>
                    <Link href="/portfolio/new">
                        <ThemedButton variant="primary">Create Portfolio</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Portfolio List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search portfolios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Portfolio Type</ThemedTableCell>
                                <ThemedTableCell header>Portfolio No</ThemedTableCell>
                                <ThemedTableCell header>Account</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredPortfolios.map((portfolio) => (
                                <ThemedTableRow key={portfolio.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">
                                            {portfolioTypes[portfolio.portfolio_name] || portfolio.portfolio_name}
                                        </div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-medium">
                                        {portfolio.portfolio_no}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {portfolio.account?.account_type?.replace('_', ' ')} ({portfolio.account?.account_no})
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            portfolio.status === 'active' ? 'success' : 'warning'
                                        }>
                                            {portfolio.status}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {portfolio.created_at ? new Date(portfolio.created_at).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/portfolio/${portfolio.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/portfolio/${portfolio.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(portfolio.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
