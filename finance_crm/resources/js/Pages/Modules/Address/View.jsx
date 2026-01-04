import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function AddressView({ addresses = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAddresses = addresses.filter(address => 
        (address.street && address.street.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (address.city && address.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (address.state && address.state.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this address?')) {
            router.delete(`/address/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Addresses</h1>
                        <p className="text-theme-secondary">Manage address information</p>
                    </div>
                    <Link href="/address/new">
                        <ThemedButton variant="primary">Add Address</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Address List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search addresses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Street</ThemedTableCell>
                                <ThemedTableCell header>City</ThemedTableCell>
                                <ThemedTableCell header>State</ThemedTableCell>
                                <ThemedTableCell header>Postal Code</ThemedTableCell>
                                <ThemedTableCell header>Country</ThemedTableCell>
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredAddresses.length > 0 ? filteredAddresses.map((address) => (
                                <ThemedTableRow key={address.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{address.street || 'N/A'}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {address.city || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {address.state || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {address.postal_code || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {address.country || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant="info">
                                            {address.type || 'Primary'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/address/${address.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/address/${address.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(address.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                <ThemedTableRow>
                                    <ThemedTableCell colSpan={7}>
                                        <div className="p-8 text-center text-theme-muted">
                                            No addresses found.
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}