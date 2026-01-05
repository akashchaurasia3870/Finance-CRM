import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function LeadsView({ leads = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLeads = leads.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.source && lead.source.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lead.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this lead?')) {
            router.delete(`/leads/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        switch(status) {
            case 'new': return 'info';
            case 'contacted': return 'warning';
            case 'qualified': return 'primary';
            case 'converted': return 'success';
            case 'lost': return 'error';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Leads</h1>
                        <p className="text-theme-secondary">Manage lead information</p>
                    </div>
                    <Link href="/leads/new">
                        <ThemedButton variant="primary">Add Lead</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Lead List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search leads..."
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
                                <ThemedTableCell header>Phone</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Value</ThemedTableCell>
                                <ThemedTableCell header>Assigned To</ThemedTableCell>
                                <ThemedTableCell header>Source</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredLeads.map((lead) => (
                                <ThemedTableRow key={lead.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{lead.name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {lead.email || '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {lead.phone || '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(lead.status)}>
                                            {lead.status}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {lead.value ? `$${lead.value}` : '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {lead.assigned_to ? (lead.assigned_to.name || 'N/A') : 'Unassigned'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {lead.source || '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/leads/${lead.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/leads/${lead.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(lead.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredLeads.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No leads found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
