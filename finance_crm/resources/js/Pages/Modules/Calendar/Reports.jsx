import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function CalendarReports({ calendars = [], stats }) {
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

    const getStatusVariant = (status) => {
        switch (status) {
            case 'scheduled': return 'info';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            default: return 'info';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'meeting': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'event': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'reminder': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'task': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'note': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

    const upcomingEvents = calendars.filter(calendar => 
        new Date(calendar.start_datetime) > new Date() && calendar.status === 'scheduled'
    ).slice(0, 5);

    const recentEvents = calendars.filter(calendar => 
        calendar.status === 'completed'
    ).slice(0, 5);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Calendar Reports</h1>
                        <p className="text-gray-600">Analytics and insights for calendar events</p>
                    </div>
                    <Link href="/calendar">
                        <ThemedButton variant="secondary">Back to Calendar</ThemedButton>
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-theme-primary border rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Events</p>
                                <p className="text-2xl font-semibold text-theme-primary">{stats.total_events}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-theme-primary border rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-semibold text-theme-primary">{stats.completed}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-theme-primary border rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Scheduled</p>
                                <p className="text-2xl font-semibold text-theme-primary">{stats.scheduled}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-theme-primary border rounded-lg p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                                <p className="text-2xl font-semibold text-theme-primary">{stats.cancelled}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Event Types Chart */}
                    <div className="bg-theme-primary border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Events by Type</h3>
                        <div className="space-y-3">
                            {Object.entries(stats.by_type).map(([type, count]) => (
                                <div key={type} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(type)}`}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${stats.total_events > 0 ? (count / stats.total_events) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-theme-primary w-8">{count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status Distribution */}
                    <div className="bg-theme-primary border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Status Distribution</h3>
                        <div className="space-y-3">
                            {[
                                { status: 'scheduled', count: stats.scheduled, label: 'Scheduled' },
                                { status: 'completed', count: stats.completed, label: 'Completed' },
                                { status: 'cancelled', count: stats.cancelled, label: 'Cancelled' }
                            ].map(({ status, count, label }) => (
                                <div key={status} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}>
                                            {label}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-32 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-600 h-2 rounded-full" 
                                                style={{ width: `${stats.total_events > 0 ? (count / stats.total_events) * 100 : 0}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-theme-primary w-8">{count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upcoming Events */}
                    <div className="bg-theme-primary border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
                        <div className="space-y-3">
                            {upcomingEvents.length > 0 ? upcomingEvents.map(event => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-theme-tertiary rounded">
                                    <div>
                                        <p className="font-medium text-theme-primary">{event.title}</p>
                                        <p className="text-sm text-theme-muted">
                                            {new Date(event.start_datetime).toLocaleDateString()} at {new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(event.type)}`}>
                                        {event.type}
                                    </span>
                                </div>
                            )) : (
                                <p className="text-theme-muted text-center py-4">No upcoming events</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Completed Events */}
                    <div className="bg-theme-primary border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Recently Completed</h3>
                        <div className="space-y-3">
                            {recentEvents.length > 0 ? recentEvents.map(event => (
                                <div key={event.id} className="flex items-center justify-between p-3 bg-theme-tertiary rounded">
                                    <div>
                                        <p className="font-medium text-theme-primary">{event.title}</p>
                                        <p className="text-sm text-theme-muted">
                                            {new Date(event.start_datetime).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(event.type)}`}>
                                        {event.type}
                                    </span>
                                </div>
                            )) : (
                                <p className="text-theme-muted text-center py-4">No completed events</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* All Events Summary */}
                <div className="bg-theme-primary border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">All Events Summary</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-theme-tertiary">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-theme-muted uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {calendars.slice(0, 10).map((calendar) => (
                                    <tr key={calendar.id} className="hover:bg-theme-tertiary">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-theme-primary">{calendar.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(calendar.type)}`}>
                                                {calendar.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-theme-muted">
                                            {new Date(calendar.start_datetime).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(calendar.status)}`}>
                                                {calendar.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
