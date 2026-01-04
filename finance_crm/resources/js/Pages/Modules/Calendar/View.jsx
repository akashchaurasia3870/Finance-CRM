import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'meeting': return 'bg-purple-100 text-purple-800';
            case 'event': return 'bg-indigo-100 text-indigo-800';
            case 'reminder': return 'bg-yellow-100 text-yellow-800';
            case 'task': return 'bg-orange-100 text-orange-800';
            case 'note': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
                        <p className="text-gray-600">Manage events and schedules</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href="/calendar/calendar-view"
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Calendar View
                        </Link>
                        <Link
                            href="/calendar/reports"
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                        >
                            Reports
                        </Link>
                        <Link
                            href="/calendar/new"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Create Event
                        </Link>
                    </div>
                </div>
                
                <div className="bg-white border rounded-lg">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Calendar Events</h3>
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border rounded-md px-3 py-2 w-64"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredCalendars.map((calendar) => (
                                    <tr key={calendar.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{calendar.title}</div>
                                            {calendar.description && (
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {calendar.description}
                                                </div>
                                            )}
                                            {calendar.notes && calendar.notes.length > 0 && (
                                                <div className="text-xs text-blue-600">
                                                    {calendar.notes.length} note(s)
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(calendar.type)}`}>
                                                {calendar.type.charAt(0).toUpperCase() + calendar.type.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {calendar.is_all_day ? 
                                                new Date(calendar.start_datetime).toLocaleDateString() :
                                                new Date(calendar.start_datetime).toLocaleString()
                                            }
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(calendar.status)}`}>
                                                {calendar.status.charAt(0).toUpperCase() + calendar.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {calendar.location || calendar.meeting_link ? (
                                                <div>
                                                    {calendar.location && <div>{calendar.location}</div>}
                                                    {calendar.meeting_link && <div className="text-blue-600">Online</div>}
                                                </div>
                                            ) : 'TBD'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={`/calendar/${calendar.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/calendar/${calendar.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(calendar.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredCalendars.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No calendar events found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}