import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function ComplainView({ complains = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredComplains = complains.filter(complain => 
        complain.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complain.complainant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (complain.client && complain.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this complain?')) {
            router.delete(`/complain/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'open': return 'error';
            case 'in_progress': return 'warning';
            case 'resolved': return 'success';
            case 'closed': return 'info';
            default: return 'info';
        }
    };

    const getPriorityVariant = (priority) => {
        switch (priority) {
            case 'high': return 'error';
            case 'medium': return 'warning';
            case 'low': return 'success';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Complains</h1>
                        <p className="text-theme-secondary">Manage customer complains</p>
                    </div>
                    <Link href="/complain/new">
                        <ThemedButton variant="primary">Create</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Complain List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search complains..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Title</ThemedTableCell>
                                <ThemedTableCell header>Complainant</ThemedTableCell>
                                <ThemedTableCell header>Client</ThemedTableCell>
                                <ThemedTableCell header>Priority</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Assigned To</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredComplains.map((complain) => (
                                <ThemedTableRow key={complain.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{complain.title}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="text-theme-primary">{complain.complainant_name}</div>
                                        {complain.complainant_email && (
                                            <div className="text-sm text-theme-secondary">{complain.complainant_email}</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {complain.client ? complain.client.name : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getPriorityVariant(complain.priority)}>
                                            {complain.priority}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(complain.status)}>
                                            {complain.status.replace('_', ' ')}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {complain.assigned_user ? complain.assigned_user.name : 'Unassigned'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {new Date(complain.created_at).toLocaleDateString()}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/complain/${complain.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/complain/${complain.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(complain.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredComplains.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No complains found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
