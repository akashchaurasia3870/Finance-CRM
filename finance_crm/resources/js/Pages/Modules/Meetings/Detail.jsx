import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function MeetingsDetail({ meeting }) {
    const [noteText, setNoteText] = useState('');
    const [showNoteForm, setShowNoteForm] = useState(false);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this meeting?')) {
            router.delete(`/meetings/${meeting.id}`, {
                onSuccess: () => {
                    router.visit('/meetings');
                }
            });
        }
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        router.post(`/meetings/${meeting.id}/notes`, { notes: noteText }, {
            onSuccess: () => {
                setNoteText('');
                setShowNoteForm(false);
            }
        });
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'scheduled': return 'info';
            case 'ongoing': return 'warning';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">{meeting.title}</h1>
                        <p className="text-theme-secondary">Meeting Details</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/meetings">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/meetings/${meeting.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Meeting Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Meeting Information</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Title</label>
                                        <p className="mt-1 text-sm text-theme-primary">{meeting.title}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Status</label>
                                        <div className="mt-1">
                                            <ThemedBadge variant={getStatusVariant(meeting.status)}>
                                                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                                            </ThemedBadge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Start Time</label>
                                        <p className="mt-1 text-sm text-theme-secondary">{new Date(meeting.start_time).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">End Time</label>
                                        <p className="mt-1 text-sm text-theme-secondary">{new Date(meeting.end_time).toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Organizer</label>
                                        <p className="mt-1 text-sm text-theme-primary">{meeting.organizer ? meeting.organizer.name : 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                        <p className="mt-1 text-sm text-theme-primary">{meeting.creator ? meeting.creator.name : 'N/A'}</p>
                                    </div>
                                    {meeting.location && (
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Location</label>
                                            <p className="mt-1 text-sm text-theme-primary">{meeting.location}</p>
                                        </div>
                                    )}
                                    {meeting.meeting_link && (
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Meeting Link</label>
                                            <a 
                                                href={meeting.meeting_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Join Meeting
                                            </a>
                                        </div>
                                    )}
                                </div>
                                {meeting.description && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-theme-muted">Description</label>
                                        <p className="mt-1 text-sm text-theme-primary whitespace-pre-wrap">{meeting.description}</p>
                                    </div>
                                )}
                            </div>
                        </ThemedCard>

                        {/* Meeting Notes */}
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-theme-primary">Meeting Notes</h3>
                                    <ThemedButton
                                        variant="primary"
                                        onClick={() => setShowNoteForm(!showNoteForm)}
                                        className="text-sm"
                                    >
                                        Add Note
                                    </ThemedButton>
                                </div>
                            </div>
                            <div className="p-6">
                                {showNoteForm && (
                                    <form onSubmit={handleAddNote} className="mb-4 p-4 bg-theme-surface rounded border border-theme">
                                        <textarea
                                            value={noteText}
                                            onChange={(e) => setNoteText(e.target.value)}
                                            placeholder="Add your meeting note..."
                                            className="w-full border border-theme rounded px-3 py-2 mb-2 bg-theme-surface text-theme-primary"
                                            rows={3}
                                            required
                                        />
                                        <div className="flex space-x-2">
                                            <ThemedButton type="submit" variant="success" className="text-sm">
                                                Save Note
                                            </ThemedButton>
                                            <ThemedButton 
                                                type="button" 
                                                onClick={() => setShowNoteForm(false)}
                                                variant="secondary"
                                                className="text-sm"
                                            >
                                                Cancel
                                            </ThemedButton>
                                        </div>
                                    </form>
                                )}
                                
                                {meeting.notes && meeting.notes.length > 0 ? (
                                    <div className="space-y-4">
                                        {meeting.notes.map((note) => (
                                            <div key={note.id} className="border-l-4 border-blue-500 pl-4 bg-theme-surface p-3 rounded">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-sm text-theme-muted">
                                                        By {note.creator ? note.creator.name : 'Unknown'}
                                                    </span>
                                                    <span className="text-sm text-theme-muted">
                                                        {new Date(note.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-theme-primary whitespace-pre-wrap">{note.notes}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-theme-muted text-center py-4">No notes added yet.</p>
                                )}
                            </div>
                        </ThemedCard>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Participants */}
                        {meeting.participants && meeting.participants.length > 0 && (
                            <ThemedCard>
                                <div className="p-4 border-b border-theme">
                                    <h3 className="text-lg font-medium text-theme-primary">Participants</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {meeting.participants.map((participant) => (
                                            <div key={participant.id} className="flex justify-between items-center p-3 bg-theme-surface rounded">
                                                <div>
                                                    <p className="text-theme-primary">
                                                        {participant.user ? participant.user.name : participant.external_email}
                                                    </p>
                                                    {participant.external_email && !participant.user && (
                                                        <p className="text-sm text-theme-muted">External</p>
                                                    )}
                                                </div>
                                                <ThemedBadge variant={
                                                    participant.response === 'accepted' ? 'success' :
                                                    participant.response === 'declined' ? 'error' : 'warning'
                                                }>
                                                    {participant.response.charAt(0).toUpperCase() + participant.response.slice(1)}
                                                </ThemedBadge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ThemedCard>
                        )}

                        {/* Meeting Metadata */}
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Metadata</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created</label>
                                    <p className="mt-1 text-sm text-theme-secondary">{new Date(meeting.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Last Updated</label>
                                    <p className="mt-1 text-sm text-theme-secondary">{new Date(meeting.updated_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Meeting ID</label>
                                    <p className="mt-1 text-sm text-theme-primary font-mono">{meeting.id}</p>
                                </div>
                            </div>
                        </ThemedCard>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
