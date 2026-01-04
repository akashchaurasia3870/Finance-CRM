import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function DocumentsView({ documents = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDocuments = documents.filter(document => 
        (document.name && document.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (document.type && document.type.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this document?')) {
            router.delete(`/documents/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Documents</h1>
                        <p className="text-theme-secondary">Manage document library</p>
                    </div>
                    <Link href="/documents/new">
                        <ThemedButton variant="primary">Upload Document</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Document Library</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search documents..."
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
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Size</ThemedTableCell>
                                <ThemedTableCell header>Owner</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Uploaded</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredDocuments.length > 0 ? filteredDocuments.map((document) => (
                                <ThemedTableRow key={document.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{document.name}</div>
                                        {document.description && (
                                            <div className="text-sm text-theme-muted">{document.description.substring(0, 50)}...</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {document.type || 'PDF'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {document.size || '1.2 MB'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {document.owner?.name || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            document.status === 'active' ? 'success' :
                                            document.status === 'archived' ? 'warning' : 'info'
                                        }>
                                            {document.status || 'Active'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {document.created_at ? new Date(document.created_at).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/documents/${document.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <ThemedButton variant="ghost" className="text-xs px-2 py-1">Download</ThemedButton>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(document.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                ['Contract Agreement', 'Financial Report', 'Client Proposal'].map((name, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{name}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">PDF</ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">{(index + 1) * 0.5} MB</ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">Admin User</ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant="success">Active</ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {new Date().toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="space-x-2">
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Download</ThemedButton>
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