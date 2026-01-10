import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import StatCard from '@/Components/Dashboard/StatCard';
import Chart from '@/Components/Dashboard/Chart';
import FilterPanel from '@/Components/Dashboard/FilterPanel';
import { Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function CalendarDashboard() {
    const [calendarData, setCalendarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ dateRange: '30', status: 'all', type: 'all' });

    useEffect(() => {
        fetchCalendarData();
    }, [filters]);

    const fetchCalendarData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/dashboard/calendar?${new URLSearchParams(filters)}`);
            const data = await response.json();
            setCalendarData(data);
        } catch (error) {
            console.error('Error fetching calendar data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-theme-secondary">Loading calendar dashboard...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-theme-primary">Calendar Dashboard</h1>
                        <p className="text-theme-secondary">Calendar events and scheduling insights</p>
                    </div>
                    <div className="flex space-x-3">
                        <ThemedButton href="/calendar" variant="primary">
                            View Calendar
                        </ThemedButton>
                        <ThemedButton href="/calendar/new" variant="success">
                            New Event
                        </ThemedButton>
                        <ThemedButton href="/dashboard" variant="secondary">
                            Back to Dashboard
                        </ThemedButton>
                    </div>
                </div>

                <FilterPanel onFilterChange={handleFilterChange} filters={filters} />

                {/* Calendar Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Events"
                        value={calendarData?.total_events || 0}
                        icon="📅"
                        color="primary"
                        subtitle="All calendar events"
                    />
                    <StatCard
                        title="Upcoming Events"
                        value={calendarData?.upcoming_events || 0}
                        icon="⏰"
                        color="info"
                        subtitle="Future scheduled events"
                    />
                    <StatCard
                        title="Completed Events"
                        value={calendarData?.completed_events || 0}
                        icon="✅"
                        color="success"
                        subtitle="Successfully completed"
                    />
                    <StatCard
                        title="Event Types"
                        value={calendarData?.event_types?.length || 0}
                        icon="🏷️"
                        color="warning"
                        subtitle="Different event categories"
                    />
                </div>

                {/* Calendar Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Chart
                        title="Event Type Distribution"
                        type="pie"
                        data={{
                            labels: calendarData?.event_types?.map(type => type.event_type) || [],
                            data: calendarData?.event_types?.map(type => type.count) || []
                        }}
                        height="300px"
                    />
                    <Chart
                        title="Monthly Event Trends"
                        type="line"
                        data={calendarData?.monthly_events}
                        height="300px"
                    />
                </div>

                {/* Event Type Breakdown */}
                <ThemedCard>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-theme-primary">Event Types Overview</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {calendarData?.event_types?.map((type, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-theme-primary capitalize">
                                                {type.event_type || 'General'}
                                            </h4>
                                            <p className="text-2xl font-bold text-primary-color mt-1">{type.count}</p>
                                        </div>
                                        <div className="text-2xl">
                                            {type.event_type === 'meeting' ? '🤝' : 
                                             type.event_type === 'call' ? '📞' : 
                                             type.event_type === 'appointment' ? '📋' : 
                                             type.event_type === 'reminder' ? '⏰' : '📅'}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-500 h-2 rounded-full" 
                                                style={{ 
                                                    width: `${(type.count / calendarData?.total_events) * 100}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {((type.count / calendarData?.total_events) * 100).toFixed(1)}% of total events
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ThemedCard>

                {/* Upcoming Events Preview */}
                <ThemedCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-theme-primary">Upcoming Events</h3>
                        <Link 
                            href="/calendar/calendar-view"
                            className="text-primary-color hover:text-primary-color/80 text-sm font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">15</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-theme-primary">Team Meeting</h4>
                                <p className="text-sm text-theme-secondary">Weekly team sync and updates</p>
                                <p className="text-xs text-blue-600">Today, 2:00 PM - 3:00 PM</p>
                            </div>
                            <div className="text-blue-600">
                                <span className="text-sm">🤝</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 font-semibold">16</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-theme-primary">Client Presentation</h4>
                                <p className="text-sm text-theme-secondary">Q4 results presentation to ABC Corp</p>
                                <p className="text-xs text-green-600">Tomorrow, 10:00 AM - 11:30 AM</p>
                            </div>
                            <div className="text-green-600">
                                <span className="text-sm">📊</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <span className="text-yellow-600 font-semibold">18</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-theme-primary">Project Deadline</h4>
                                <p className="text-sm text-theme-secondary">Final submission for Project Alpha</p>
                                <p className="text-xs text-yellow-600">Dec 18, 11:59 PM</p>
                            </div>
                            <div className="text-yellow-600">
                                <span className="text-sm">⏰</span>
                            </div>
                        </div>
                    </div>
                </ThemedCard>

                {/* Quick Actions */}
                <ThemedCard className="p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Link
                            href="/calendar/new"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-2xl mr-3">➕</div>
                            <div>
                                <h4 className="font-medium text-theme-primary">New Event</h4>
                                <p className="text-sm text-theme-secondary">Schedule new event</p>
                            </div>
                        </Link>
                        <Link
                            href="/calendar/calendar-view"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-2xl mr-3">📅</div>
                            <div>
                                <h4 className="font-medium text-theme-primary">Calendar View</h4>
                                <p className="text-sm text-theme-secondary">View full calendar</p>
                            </div>
                        </Link>
                        <Link
                            href="/calendar/reports"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-2xl mr-3">📊</div>
                            <div>
                                <h4 className="font-medium text-theme-primary">Reports</h4>
                                <p className="text-sm text-theme-secondary">Calendar analytics</p>
                            </div>
                        </Link>
                        <Link
                            href="/meetings/new"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-2xl mr-3">🤝</div>
                            <div>
                                <h4 className="font-medium text-theme-primary">Schedule Meeting</h4>
                                <p className="text-sm text-theme-secondary">Book new meeting</p>
                            </div>
                        </Link>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}