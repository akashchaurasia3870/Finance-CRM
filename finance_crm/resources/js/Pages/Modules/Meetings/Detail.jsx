import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function MeetingsDetail({ meeting }) {
    const [noteText, setNoteText] = useState('');
    const [showNoteForm, setShowNoteForm] = useState(false);

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this meeting?')) {
            router.delete(`/meetings/${meeting.id}`);
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'ongoing': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{meeting.title}</h1>
                        <p className="text-gray-600">Meeting Details</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={`/meetings/${meeting.id}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                        >
                            Delete
                        </button>
                        <Link
                            href="/meetings"
                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Meeting Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Meeting Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Title</label>
                                    <p className="text-gray-900">{meeting.title}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Status</label>
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status)}`}>
                                        {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Start Time</label>
                                    <p className="text-gray-900">{new Date(meeting.start_time).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">End Time</label>
                                    <p className="text-gray-900">{new Date(meeting.end_time).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Organizer</label>
                                    <p className="text-gray-900">{meeting.organizer ? meeting.organizer.name : 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="text-gray-900">{meeting.creator ? meeting.creator.name : 'N/A'}</p>
                                </div>
                                {meeting.location && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Location</label>
                                        <p className="text-gray-900">{meeting.location}</p>
                                    </div>
                                )}
                                {meeting.meeting_link && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Meeting Link</label>
                                        <a 
                                            href={meeting.meeting_link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            Join Meeting
                                        </a>
                                    </div>
                                )}
                            </div>
                            {meeting.description && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                                    <p className="text-gray-900 whitespace-pre-wrap">{meeting.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Meeting Notes */}
                        <div className="bg-white border rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Meeting Notes</h3>
                                <button
                                    onClick={() => setShowNoteForm(!showNoteForm)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                                >
                                    Add Note
                                </button>
                            </div>
                            
                            {showNoteForm && (
                                <form onSubmit={handleAddNote} className="mb-4 p-4 bg-gray-50 rounded">
                                    <textarea
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        placeholder="Add your meeting note..."
                                        className="w-full border rounded px-3 py-2 mb-2"
                                        rows={3}
                                        required
                                    />
                                    <div className="flex space-x-2">
                                        <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                                            Save Note
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => setShowNoteForm(false)}
                                            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                            
                            {meeting.notes && meeting.notes.length > 0 ? (
                                <div className="space-y-4">
                                    {meeting.notes.map((note) => (
                                        <div key={note.id} className="border-l-4 border-blue-500 pl-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-sm text-gray-500">
                                                    By {note.creator ? note.creator.name : 'Unknown'}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(note.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-gray-900 whitespace-pre-wrap">{note.notes}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No notes added yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Participants */}
                        {meeting.participants && meeting.participants.length > 0 && (
                            <div className="bg-white border rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-4">Participants</h3>
                                <div className="space-y-3">
                                    {meeting.participants.map((participant) => (
                                        <div key={participant.id} className="flex justify-between items-center">
                                            <div>
                                                <p className="text-gray-900">
                                                    {participant.user ? participant.user.name : participant.external_email}
                                                </p>
                                                {participant.external_email && !participant.user && (
                                                    <p className="text-sm text-gray-500">External</p>
                                                )}
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                participant.response === 'accepted' ? 'bg-green-100 text-green-800' :
                                                participant.response === 'declined' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {participant.response.charAt(0).toUpperCase() + participant.response.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Meeting Metadata */}
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Metadata</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created</label>
                                    <p className="text-gray-900">{new Date(meeting.created_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                                    <p className="text-gray-900">{new Date(meeting.updated_at).toLocaleString()}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Meeting ID</label>
                                    <p className="text-gray-900 font-mono text-sm">{meeting.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}