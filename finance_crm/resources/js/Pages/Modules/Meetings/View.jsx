import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function MeetingsView({ meetings = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMeetings = meetings.filter(meeting => 
        (meeting.title && meeting.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (meeting.description && meeting.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this meeting?')) {
            router.delete(`/meetings/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        switch(status) {
            case 'scheduled': return 'info';
            case 'in_progress': return 'warning';
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
                        <h1 className="text-2xl font-bold text-theme-primary">Meetings</h1>
                        <p className="text-theme-secondary">Manage meeting schedules</p>
                    </div>
                    <Link href="/meetings/new">
                        <ThemedButton variant="primary">Schedule Meeting</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Meetings List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search meetings..."
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
                                <ThemedTableCell header>Date & Time</ThemedTableCell>
                                <ThemedTableCell header>Duration</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Participants</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredMeetings.length > 0 ? filteredMeetings.map((meeting) => (
                                <ThemedTableRow key={meeting.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{meeting.title || 'Meeting'}</div>
                                        {meeting.description && (
                                            <div className="text-sm text-theme-muted">{meeting.description.substring(0, 50)}...</div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {meeting.scheduled_at ? new Date(meeting.scheduled_at).toLocaleString() : 'TBD'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {meeting.duration || '60'} mins
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(meeting.status || 'scheduled')}>
                                            {meeting.status || 'Scheduled'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-primary">
                                        {meeting.participants || 'N/A'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/meetings/${meeting.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/meetings/${meeting.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(meeting.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            )) : (
                                // Sample data when no meetings exist
                                ['Team Standup', 'Client Review', 'Project Planning'].map((title, index) => (
                                    <ThemedTableRow key={index}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{title}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">60 mins</ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant="info">Scheduled</ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">5 people</ThemedTableCell>
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
