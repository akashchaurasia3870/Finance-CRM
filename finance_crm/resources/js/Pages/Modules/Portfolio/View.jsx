import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function PortfolioView({ portfolios = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPortfolios = portfolios.filter(portfolio => 
        (portfolio.portfolio_name && portfolio.portfolio_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (portfolio.description && portfolio.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
                                <ThemedTableCell header>Name</ThemedTableCell>
                                <ThemedTableCell header>Value</ThemedTableCell>
                                <ThemedTableCell header>Performance</ThemedTableCell>
                                <ThemedTableCell header>Risk Level</ThemedTableCell>
                                <ThemedTableCell header>Account</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredPortfolios.length > 0 ? filteredPortfolios.map((portfolio) => (
                                <ThemedTableRow key={portfolio.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{portfolio.portfolio_name}</div>
                                        {portfolio.description && (
                                            <div className="text-sm text-theme-muted">{portfolio.description.substring(0, 50)}...</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-semibold">
                                        ${portfolio.total_value || '0.00'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <span className={`font-medium ${
                                            (portfolio.performance || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {(portfolio.performance || 0) >= 0 ? '+' : ''}{portfolio.performance || 0}%
                                        </span>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            portfolio.risk_level === 'low' ? 'success' :
                                            portfolio.risk_level === 'medium' ? 'warning' : 'error'
                                        }>
                                            {portfolio.risk_level || 'Medium'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {portfolio.account?.name || 'N/A'}
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
                            )) : (
                                ['Balanced Growth', 'Conservative Income', 'Aggressive Growth'].map((name, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{name}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary font-semibold">
                                            ${((index + 1) * 50000).toLocaleString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <span className={`font-medium ${index === 2 ? 'text-red-600' : 'text-green-600'}`}>
                                                {index === 2 ? '-2.1%' : `+${(index + 1) * 3.5}%`}
                                            </span>
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={index === 0 ? 'warning' : index === 1 ? 'success' : 'error'}>
                                                {index === 0 ? 'Medium' : index === 1 ? 'Low' : 'High'}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">Sample Account</ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {new Date().toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="space-x-2">
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1 text-red-600 hover:text-red-800">Delete</ThemedButton>
                                            </div>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
