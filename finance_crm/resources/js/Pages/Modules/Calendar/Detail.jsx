import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge, ThemedTextarea } from '@/Components/ThemedComponents';

export default function CalendarDetail({ calendar }) {
    const [noteText, setNoteText] = useState('');
    const [showNoteForm, setShowNoteForm] = useState(false);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this calendar event?')) {
            router.delete(`/calendar/${calendar.id}`, {
                onSuccess: () => {
                    router.visit('/calendar');
                }
            });
        }
    };

    const handleAddNote = (e) => {
        e.preventDefault();
        router.post(`/calendar/${calendar.id}/notes`, { note: noteText }, {
            onSuccess: () => {
                setNoteText('');
                setShowNoteForm(false);
            }
        });
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'scheduled': return 'info';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            default: return 'info';
        }
    };

    const getTypeVariant = (type) => {
        switch (type) {
            case 'meeting': return 'warning';
            case 'event': return 'info';
            case 'reminder': return 'warning';
            case 'task': return 'success';
            case 'note': return 'info';
            default: return 'info';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">{calendar.title}</h1>
                        <p className="text-theme-secondary">Calendar Event Details</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/calendar">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/calendar/${calendar.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Event Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Event Information</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Title</label>
                                        <p className="mt-1 text-sm text-theme-primary">{calendar.title}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Type</label>
                                        <div className="mt-1">
                                            <ThemedBadge variant={getTypeVariant(calendar.type)}>
                                                {calendar.type.charAt(0).toUpperCase() + calendar.type.slice(1)}
                                            </ThemedBadge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Status</label>
                                        <div className="mt-1">
                                            <ThemedBadge variant={getStatusVariant(calendar.status)}>
                                                {calendar.status.charAt(0).toUpperCase() + calendar.status.slice(1)}
                                            </ThemedBadge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">All Day</label>
                                        <p className="mt-1 text-sm text-theme-primary">{calendar.is_all_day ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Start Date & Time</label>
                                        <p className="mt-1 text-sm text-theme-secondary">
                                            {calendar.is_all_day ? 
                                                new Date(calendar.start_datetime).toLocaleDateString() :
                                                new Date(calendar.start_datetime).toLocaleString()
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">End Date & Time</label>
                                        <p className="mt-1 text-sm text-theme-secondary">
                                            {calendar.is_all_day ? 
                                                new Date(calendar.end_datetime).toLocaleDateString() :
                                                new Date(calendar.end_datetime).toLocaleString()
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                        <p className="mt-1 text-sm text-theme-primary">{calendar.creator ? calendar.creator.name : 'N/A'}</p>
                                    </div>
                                    {calendar.location && (
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Location</label>
                                            <p className="mt-1 text-sm text-theme-primary">{calendar.location}</p>
                                        </div>
                                    )}
                                    {calendar.meeting_link && (
                                        <div>
                                            <label className="block text-sm font-medium text-theme-muted">Meeting Link</label>
                                            <a 
                                                href={calendar.meeting_link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="mt-1 text-sm text-blue-600 hover:text-blue-800 underline"
                                            >
                                                Join Event
                                            </a>
                                        </div>
                                    )}
                                </div>
                                {calendar.description && (
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-theme-muted">Description</label>
                                        <p className="mt-1 text-sm text-theme-primary whitespace-pre-wrap">{calendar.description}</p>
                                    </div>
                                )}
                            </div>
                        </ThemedCard>

                        {/* Event Notes */}
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-medium text-theme-primary">Event Notes</h3>
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
                                    <form onSubmit={handleAddNote} className="mb-4 p-4 bg-theme-primary rounded border border-theme">
                                        <ThemedTextarea
                                            value={noteText}
                                            onChange={(e) => setNoteText(e.target.value)}
                                            placeholder="Add your event note..."
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
                                
                                {calendar.notes && calendar.notes.length > 0 ? (
                                    <div className="space-y-4">
                                        {calendar.notes.map((note) => (
                                            <div key={note.id} className="border-l-4 border-blue-500 pl-4 bg-theme-primary p-3 rounded">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-sm text-theme-muted">
                                                        By {note.creator ? note.creator.name : 'Unknown'}
                                                    </span>
                                                    <span className="text-sm text-theme-muted">
                                                        {new Date(note.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <p className="text-theme-primary whitespace-pre-wrap">{note.note}</p>
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
                        {calendar.participants && calendar.participants.length > 0 && (
                            <ThemedCard>
                                <div className="p-4 border-b border-theme">
                                    <h3 className="text-lg font-medium text-theme-primary">Participants</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {calendar.participants.map((participant) => (
                                            <div key={participant.id} className="flex justify-between items-center p-3 bg-theme-primary rounded">
                                                <div>
                                                    <p className="text-theme-primary">
                                                        {participant.user ? participant.user.name : participant.external_email}
                                                    </p>
                                                    <p className="text-sm text-theme-muted">
                                                        {participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
                                                    </p>
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

                        {/* Event Metadata */}
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Metadata</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created</label>
                                    <p className="mt-1 text-sm text-theme-secondary">{new Date(calendar.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Last Updated</label>
                                    <p className="mt-1 text-sm text-theme-secondary">{new Date(calendar.updated_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Event ID</label>
                                    <p className="mt-1 text-sm text-theme-primary font-mono">{calendar.id}</p>
                                </div>
                            </div>
                        </ThemedCard>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
