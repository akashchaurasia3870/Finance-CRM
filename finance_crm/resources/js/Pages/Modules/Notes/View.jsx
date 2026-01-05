import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function NotesView({ notes = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotes = notes.filter(note => 
        (note.title && note.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this note?')) {
            router.delete(`/notes/${id}`);
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Notes</h1>
                        <p className="text-theme-secondary">Manage personal and shared notes</p>
                    </div>
                    <Link href="/notes/new">
                        <ThemedButton variant="primary">Create Note</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Notes Collection</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search notes..."
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
                                <ThemedTableCell header>Category</ThemedTableCell>
                                <ThemedTableCell header>Priority</ThemedTableCell>
                                <ThemedTableCell header>Author</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredNotes.length > 0 ? filteredNotes.map((note) => (
                                <ThemedTableRow key={note.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{note.title}</div>
                                        {note.content && (
                                            <div className="text-sm text-theme-muted">{note.content.substring(0, 60)}...</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant="info">
                                            {note.category || 'General'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={
                                            note.priority === 'high' ? 'error' :
                                            note.priority === 'medium' ? 'warning' : 'success'
                                        }>
                                            {note.priority || 'Low'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {note.author?.name || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {note.created_at ? new Date(note.created_at).toLocaleDateString() : 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/notes/${note.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/notes/${note.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(note.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                ['Meeting Notes', 'Project Ideas', 'Client Feedback'].map((title, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{title}</div>
                                            <div className="text-sm text-theme-muted">Sample note content for {title.toLowerCase()}...</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant="info">
                                                {index === 0 ? 'Meeting' : index === 1 ? 'Project' : 'Client'}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={index === 0 ? 'error' : index === 1 ? 'warning' : 'success'}>
                                                {index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">Current User</ThemedTableCell>
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
