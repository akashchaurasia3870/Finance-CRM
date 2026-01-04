import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function ClientView({ clients = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = clients.filter(client => 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this client?')) {
            router.delete(`/client/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Clients</h1>
                        <p className="text-theme-secondary">Manage client information</p>
                    </div>
                    <Link href="/client/new">
                        <ThemedButton variant="primary">Add Client</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Client List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search clients..."
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
                                <ThemedTableCell header>Email</ThemedTableCell>
                                <ThemedTableCell header>Company</ThemedTableCell>
                                <ThemedTableCell header>Phone</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredClients.map((client) => (
                                <ThemedTableRow key={client.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{client.name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="text-theme-primary">{client.email}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="text-theme-primary">{client.company || '-'}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="text-theme-primary">{client.phone || '-'}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={client.status === 'active' ? 'success' : 'error'}>
                                            {client.status}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {new Date(client.created_at).toLocaleDateString()}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/client/${client.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/client/${client.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(client.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredClients.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No clients found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
