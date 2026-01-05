import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function EmailTemplateView({ templates = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTemplates = templates.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (template.category && template.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this email template?')) {
            router.delete(`/emailtemplate/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Email Templates</h1>
                        <p className="text-theme-secondary">Manage email templates</p>
                    </div>
                    <Link href="/emailtemplate/new">
                        <ThemedButton variant="primary">Create</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Template List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search templates..."
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
                                <ThemedTableCell header>Subject</ThemedTableCell>
                                <ThemedTableCell header>Category</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Version</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredTemplates.map((template) => (
                                <ThemedTableRow key={template.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{template.name}</div>
                                        <div className="text-sm text-theme-secondary">{template.slug}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="text-theme-primary">{template.subject}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {template.category || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={template.is_active ? 'success' : 'error'}>
                                            {template.is_active ? 'Active' : 'Inactive'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        v{template.version}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {new Date(template.created_at).toLocaleDateString()}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/emailtemplate/${template.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/emailtemplate/${template.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(template.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredTemplates.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No email templates found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
