import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput } from '@/Components/ThemedComponents';

export default function View({ auth, positions = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPositions = positions.filter(position =>
        position.product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.portfolio?.portfolio_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        position.portfolio?.account?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this position?')) {
            router.delete(`/position/${id}`);
        }
    };

    return (
        <Layout>
            <Head title="Security Positions" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Security Positions</h1>
                        <p className="text-theme-secondary">Manage security positions</p>
                    </div>
                    <Link href="/position/new">
                        <ThemedButton variant="primary">Add New Position</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Position List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search positions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Portfolio</ThemedTableCell>
                                <ThemedTableCell header>Product</ThemedTableCell>
                                <ThemedTableCell header>Quantity</ThemedTableCell>
                                <ThemedTableCell header>Avg Price</ThemedTableCell>
                                <ThemedTableCell header>Market Value</ThemedTableCell>
                                <ThemedTableCell header>Last Updated</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredPositions.map((position) => (
                                <ThemedTableRow key={position.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{position.portfolio?.portfolio_name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{position.product?.name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {position.quantity}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        ${position.avg_price}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary font-semibold">
                                        ${position.market_value}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {new Date(position.last_updated).toLocaleDateString()}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/position/${position.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/position/${position.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(position.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredPositions.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No positions found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
