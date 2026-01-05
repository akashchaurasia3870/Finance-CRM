import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function ProductView({ products = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(product => 
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_type?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/product/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Products</h1>
                        <p className="text-theme-secondary">Manage financial products</p>
                    </div>
                    <Link href="/product/new">
                        <ThemedButton variant="primary">Create</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Product List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search products..."
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
                                <ThemedTableCell header>Symbol</ThemedTableCell>
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Sector</ThemedTableCell>
                                <ThemedTableCell header>Risk Level</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredProducts.map((product) => (
                                <ThemedTableRow key={product.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{product.name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {product.symbol || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant="info">
                                            {product.product_type}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {product.sector || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            product.risk_level === 'low' ? 'success' :
                                            product.risk_level === 'medium' ? 'warning' :
                                            product.risk_level === 'high' ? 'error' : 'error'
                                        }>
                                            {product.risk_level}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={product.is_active ? 'success' : 'error'}>
                                            {product.is_active ? 'Active' : 'Inactive'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/product/${product.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/product/${product.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredProducts.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No products found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
