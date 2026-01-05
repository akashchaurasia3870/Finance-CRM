import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function CalendarView({ calendars = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCalendars = calendars.filter(calendar => 
        calendar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        calendar.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this calendar event?')) {
            router.delete(`/calendar/${id}`);
        }
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
                        <h1 className="text-2xl font-bold text-theme-primary">Calendar</h1>
                        <p className="text-theme-secondary">Manage events and schedules</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href="/calendar/calendar-view">
                            <ThemedButton variant="success">Calendar View</ThemedButton>
                        </Link>
                        <Link href="/calendar/reports">
                            <ThemedButton variant="secondary">Reports</ThemedButton>
                        </Link>
                        <Link href="/calendar/new">
                            <ThemedButton variant="primary">Create</ThemedButton>
                        </Link>
                    </div>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Calendar Events</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search events..."
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
                                <ThemedTableCell header>Type</ThemedTableCell>
                                <ThemedTableCell header>Start Date</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Location</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredCalendars.map((calendar) => (
                                <ThemedTableRow key={calendar.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{calendar.title}</div>
                                        {calendar.description && (
                                            <div className="text-sm text-theme-muted truncate max-w-xs">
                                                {calendar.description}
                                            </div>
                                        )}
                                        {calendar.notes && calendar.notes.length > 0 && (
                                            <div className="text-xs text-blue-600">
                                                {calendar.notes.length} note(s)
                                            </div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getTypeVariant(calendar.type)}>
                                            {calendar.type.charAt(0).toUpperCase() + calendar.type.slice(1)}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {calendar.is_all_day ? 
                                            new Date(calendar.start_datetime).toLocaleDateString() :
                                            new Date(calendar.start_datetime).toLocaleString()
                                        }
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(calendar.status)}>
                                            {calendar.status.charAt(0).toUpperCase() + calendar.status.slice(1)}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {calendar.location || calendar.meeting_link ? (
                                            <div>
                                                {calendar.location && <div>{calendar.location}</div>}
                                                {calendar.meeting_link && <div className="text-blue-600">Online</div>}
                                            </div>
                                        ) : 'TBD'}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/calendar/${calendar.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/calendar/${calendar.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(calendar.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredCalendars.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No calendar events found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
