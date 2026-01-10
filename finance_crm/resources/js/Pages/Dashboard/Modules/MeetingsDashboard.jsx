import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import StatCard from '@/Components/Dashboard/StatCard';
import Chart from '@/Components/Dashboard/Chart';
import FilterPanel from '@/Components/Dashboard/FilterPanel';
import { Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function MeetingsDashboard() {
    const [meetingsData, setMeetingsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ dateRange: '30', status: 'all', type: 'all' });

    useEffect(() => {
        fetchMeetingsData();
    }, [filters]);

    const fetchMeetingsData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/dashboard/meetings?${new URLSearchParams(filters)}`);
            const data = await response.json();
            setMeetingsData(data);
        } catch (error) {
            console.error('Error fetching meetings data:', error);
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
                    <div className="text-lg text-theme-secondary">Loading meetings dashboard...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-theme-primary">Meetings Dashboard</h1>
                        <p className="text-theme-secondary">Meeting management and analytics</p>
                    </div>
                    <div className="flex space-x-3">
                        <ThemedButton href="/meetings" variant="primary">
                            View Meetings
                        </ThemedButton>
                        <ThemedButton href="/meetings/new" variant="success">
                            Schedule Meeting
                        </ThemedButton>
                        <ThemedButton href="/dashboard" variant="secondary">
                            Back to Dashboard
                        </ThemedButton>
                    </div>
                </div>

                <FilterPanel onFilterChange={handleFilterChange} filters={filters} />

                {/* Meeting Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Meetings"
                        value={meetingsData?.total_meetings || 0}
                        icon="🤝"
                        color="primary"
                        subtitle="All scheduled meetings"
                    />
                    <StatCard
                        title="Upcoming Meetings"
                        value={meetingsData?.upcoming_meetings || 0}
                        icon="📅"
                        color="info"
                        subtitle="Future meetings"
                    />
                    <StatCard
                        title="Completed Meetings"
                        value={meetingsData?.completed_meetings || 0}
                        icon="✅"
                        color="success"
                        subtitle="Successfully completed"
                    />
                    <StatCard
                        title="Meeting Types"
                        value={meetingsData?.meeting_types?.length || 0}
                        icon="🏷️"
                        color="warning"
                        subtitle="Different meeting categories"
                    />
                </div>

                {/* Meeting Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Chart
                        title="Meeting Type Distribution"
                        type="pie"
                        data={{
                            labels: meetingsData?.meeting_types?.map(type => type.meeting_type) || [],
                            data: meetingsData?.meeting_types?.map(type => type.count) || []
                        }}
                        height="300px"
                    />
                    <Chart
                        title="Monthly Meeting Trends"
                        type="bar"
                        data={meetingsData?.monthly_meetings}
                        height="300px"
                    />
                </div>

                {/* Meeting Type Breakdown */}
                <ThemedCard>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-theme-primary">Meeting Types Overview</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {meetingsData?.meeting_types?.map((type, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-theme-primary capitalize">
                                                {type.meeting_type || 'General'}
                                            </h4>
                                            <p className="text-2xl font-bold text-primary-color mt-1">{type.count}</p>
                                        </div>
                                        <div className="text-2xl">
                                            {type.meeting_type === 'client' ? '🏢' : 
                                             type.meeting_type === 'team' ? '👥' : 
                                             type.meeting_type === 'presentation' ? '📊' : 
                                             type.meeting_type === 'interview' ? '💼' : '🤝'}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-purple-500 h-2 rounded-full" 
                                                style={{ 
                                                    width: `${(type.count / meetingsData?.total_meetings) * 100}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {((type.count / meetingsData?.total_meetings) * 100).toFixed(1)}% of total meetings
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ThemedCard>

                {/* Today's Meetings */}
                <ThemedCard className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-theme-primary">Today's Meetings</h3>
                        <Link 
                            href="/meetings"
                            className="text-primary-color hover:text-primary-color/80 text-sm font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 font-semibold">9:00</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-theme-primary">Client Consultation</h4>
                                <p className="text-sm text-theme-secondary">ABC Corporation - Project Discussion</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Client Meeting</span>
                                    <span className="text-xs text-gray-500 ml-2">📍 Conference Room A</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-blue-600">9:00 AM - 10:30 AM</p>
                                <p className="text-xs text-gray-500">1.5 hours</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-green-600 font-semibold">2:00</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-theme-primary">Team Standup</h4>
                                <p className="text-sm text-theme-secondary">Daily team sync and updates</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Team Meeting</span>
                                    <span className="text-xs text-gray-500 ml-2">💻 Virtual Meeting</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-green-600">2:00 PM - 2:30 PM</p>
                                <p className="text-xs text-gray-500">30 minutes</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <span className="text-yellow-600 font-semibold">4:00</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-medium text-theme-primary">Quarterly Review</h4>
                                <p className="text-sm text-theme-secondary">Q4 performance review with management</p>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Review Meeting</span>
                                    <span className="text-xs text-gray-500 ml-2">📍 Executive Boardroom</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-yellow-600">4:00 PM - 5:30 PM</p>
                                <p className="text-xs text-gray-500">1.5 hours</p>
                            </div>
                        </div>
                    </div>
                </ThemedCard>

                {/* Meeting Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-semibold text-theme-primary mb-4">Meeting Performance</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-theme-secondary">On-time Start Rate</span>
                                <span className="text-sm font-medium text-green-600">85%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-theme-secondary">Average Duration</span>
                                <span className="text-sm font-medium text-blue-600">45 min</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-theme-secondary">Attendance Rate</span>
                                <span className="text-sm font-medium text-purple-600">92%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                        </div>
                    </ThemedCard>

                    <ThemedCard className="p-6">
                        <h3 className="text-lg font-semibold text-theme-primary mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3">
                            <Link
                                href="/meetings/new"
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-xl mr-3">➕</div>
                                <div>
                                    <h4 className="font-medium text-theme-primary">Schedule New Meeting</h4>
                                    <p className="text-sm text-theme-secondary">Book a new meeting slot</p>
                                </div>
                            </Link>
                            <Link
                                href="/calendar/calendar-view"
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-xl mr-3">📅</div>
                                <div>
                                    <h4 className="font-medium text-theme-primary">View Calendar</h4>
                                    <p className="text-sm text-theme-secondary">Check meeting schedule</p>
                                </div>
                            </Link>
                            <Link
                                href="/meetings"
                                className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-xl mr-3">📋</div>
                                <div>
                                    <h4 className="font-medium text-theme-primary">Manage Meetings</h4>
                                    <p className="text-sm text-theme-secondary">Edit or cancel meetings</p>
                                </div>
                            </Link>
                        </div>
                    </ThemedCard>
                </div>
            </div>
        </Layout>
    );
}