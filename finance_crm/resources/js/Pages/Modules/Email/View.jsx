import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function EmailView({ emails = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEmails = emails.filter(email => 
        (email.to_email && email.to_email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (email.subject && email.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (email.from_email && email.from_email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this email?')) {
            router.delete(`/email/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'draft': return 'info';
            case 'queued': return 'warning';
            case 'sent': return 'success';
            case 'failed': return 'error';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Emails</h1>
                        <p className="text-theme-secondary">Manage emails</p>
                    </div>
                    <Link href="/email/new">
                        <ThemedButton variant="primary">Create</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Email List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search emails..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>To</ThemedTableCell>
                                <ThemedTableCell header>Subject</ThemedTableCell>
                                <ThemedTableCell header>Template</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Sent At</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredEmails.map((email) => (
                                <ThemedTableRow key={email.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{email.to_email}</div>
                                        {email.from_email && (
                                            <div className="text-sm text-theme-secondary">From: {email.from_email}</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="text-theme-primary">{email.subject}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {email.template ? email.template.name : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(email.status)}>
                                            {email.status}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {email.sent_at ? new Date(email.sent_at).toLocaleString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/email/${email.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/email/${email.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(email.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredEmails.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No emails found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
