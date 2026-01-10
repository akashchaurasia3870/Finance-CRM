import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import StatCard from '@/Components/Dashboard/StatCard';
import Chart from '@/Components/Dashboard/Chart';
import FilterPanel from '@/Components/Dashboard/FilterPanel';
import { Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function DashboardReports() {
    const [reportsData, setReportsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ dateRange: '30', status: 'all', type: 'all' });
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        fetchReportsData();
    }, [filters]);

    const fetchReportsData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/dashboard?${new URLSearchParams(filters)}`);
            const data = await response.json();
            setReportsData(data.data);
        } catch (error) {
            console.error('Error fetching reports data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const exportReport = (format) => {
        // Implementation for exporting reports
        console.log(`Exporting report in ${format} format`);
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg text-theme-secondary">Loading reports...</div>
                </div>
            </Layout>
        );
    }

    const tabs = [
        { id: 'overview', name: 'Overview', icon: '📊' },
        { id: 'users', name: 'Users', icon: '👥' },
        { id: 'calendar', name: 'Calendar', icon: '📅' },
        { id: 'meetings', name: 'Meetings', icon: '🤝' },
        { id: 'performance', name: 'Performance', icon: '📈' }
    ];

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-theme-primary">Dashboard Reports</h1>
                        <p className="text-theme-secondary">Comprehensive analytics and insights</p>
                    </div>
                    <div className="flex space-x-3">
                        <ThemedButton onClick={() => exportReport('pdf')} variant="danger">
                            Export PDF
                        </ThemedButton>
                        <ThemedButton onClick={() => exportReport('excel')} variant="success">
                            Export Excel
                        </ThemedButton>
                        <ThemedButton href="/dashboard" variant="secondary">
                            Back to Dashboard
                        </ThemedButton>
                    </div>
                </div>

                <FilterPanel onFilterChange={handleFilterChange} filters={filters} />

                {/* Tab Navigation */}
                <ThemedCard>
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === tab.id
                                            ? 'border-primary-color text-primary-color'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-theme-primary">System Overview</h3>
                                
                                {/* Key Metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <StatCard
                                        title="Total Users"
                                        value={reportsData?.users?.total || 0}
                                        icon="👥"
                                        color="primary"
                                        trend={{
                                            direction: reportsData?.users?.growth_rate > 0 ? 'up' : 'down',
                                            value: Math.abs(reportsData?.users?.growth_rate || 0),
                                            period: 'vs last period'
                                        }}
                                    />
                                    <StatCard
                                        title="Active Clients"
                                        value={reportsData?.clients?.active_clients || 0}
                                        icon="🏢"
                                        color="success"
                                    />
                                    <StatCard
                                        title="Total Events"
                                        value={reportsData?.calendar?.total_events || 0}
                                        icon="📅"
                                        color="info"
                                    />
                                    <StatCard
                                        title="Meetings Held"
                                        value={reportsData?.meetings?.completed_meetings || 0}
                                        icon="🤝"
                                        color="warning"
                                    />
                                </div>

                                {/* Overview Charts */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <Chart
                                        title="System Activity Overview"
                                        type="line"
                                        data={reportsData?.charts?.user_growth}
                                        height="300px"
                                    />
                                    <Chart
                                        title="Module Usage Distribution"
                                        type="pie"
                                        data={{
                                            labels: ['Users', 'Calendar', 'Meetings', 'Tasks', 'Clients'],
                                            data: [
                                                reportsData?.users?.total || 0,
                                                reportsData?.calendar?.total_events || 0,
                                                reportsData?.meetings?.total_meetings || 0,
                                                reportsData?.tasks?.total_tasks || 0,
                                                reportsData?.clients?.total_clients || 0
                                            ]
                                        }}
                                        height="300px"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-theme-primary">User Analytics</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <StatCard
                                        title="Total Users"
                                        value={reportsData?.users?.total || 0}
                                        icon="👥"
                                        color="primary"
                                    />
                                    <StatCard
                                        title="Active Users"
                                        value={reportsData?.users?.active || 0}
                                        icon="✅"
                                        color="success"
                                    />
                                    <StatCard
                                        title="New This Month"
                                        value={reportsData?.users?.new_this_month || 0}
                                        icon="🆕"
                                        color="info"
                                    />
                                </div>

                                <Chart
                                    title="User Registration Trends"
                                    type="line"
                                    data={reportsData?.charts?.user_growth}
                                    height="400px"
                                />

                                <ThemedCard className="p-6">
                                    <h4 className="font-medium text-theme-primary mb-4">User Insights</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-theme-secondary">Growth Rate: <span className="font-medium text-green-600">+{reportsData?.users?.growth_rate || 0}%</span></p>
                                            <p className="text-theme-secondary">Average Daily Signups: <span className="font-medium">3.2</span></p>
                                        </div>
                                        <div>
                                            <p className="text-theme-secondary">Most Active Role: <span className="font-medium">Manager</span></p>
                                            <p className="text-theme-secondary">User Retention: <span className="font-medium text-blue-600">87%</span></p>
                                        </div>
                                    </div>
                                </ThemedCard>
                            </div>
                        )}

                        {activeTab === 'calendar' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-theme-primary">Calendar Analytics</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <StatCard
                                        title="Total Events"
                                        value={reportsData?.calendar?.total_events || 0}
                                        icon="📅"
                                        color="primary"
                                    />
                                    <StatCard
                                        title="Upcoming"
                                        value={reportsData?.calendar?.upcoming_events || 0}
                                        icon="⏰"
                                        color="info"
                                    />
                                    <StatCard
                                        title="This Month"
                                        value={reportsData?.calendar?.events_this_month || 0}
                                        icon="📊"
                                        color="success"
                                    />
                                    <StatCard
                                        title="Overdue"
                                        value={reportsData?.calendar?.overdue_events || 0}
                                        icon="⚠️"
                                        color="danger"
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <Chart
                                        title="Event Creation Trends"
                                        type="bar"
                                        data={reportsData?.charts?.user_growth}
                                        height="300px"
                                    />
                                    <Chart
                                        title="Event Status Distribution"
                                        type="pie"
                                        data={{
                                            labels: ['Completed', 'Upcoming', 'Overdue'],
                                            data: [
                                                reportsData?.calendar?.total_events - reportsData?.calendar?.upcoming_events - reportsData?.calendar?.overdue_events || 0,
                                                reportsData?.calendar?.upcoming_events || 0,
                                                reportsData?.calendar?.overdue_events || 0
                                            ]
                                        }}
                                        height="300px"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'meetings' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-theme-primary">Meeting Analytics</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <StatCard
                                        title="Total Meetings"
                                        value={reportsData?.meetings?.total_meetings || 0}
                                        icon="🤝"
                                        color="primary"
                                    />
                                    <StatCard
                                        title="Upcoming"
                                        value={reportsData?.meetings?.upcoming_meetings || 0}
                                        icon="📅"
                                        color="info"
                                    />
                                    <StatCard
                                        title="Completed"
                                        value={reportsData?.meetings?.completed_meetings || 0}
                                        icon="✅"
                                        color="success"
                                    />
                                    <StatCard
                                        title="This Week"
                                        value={reportsData?.meetings?.meetings_this_week || 0}
                                        icon="📊"
                                        color="warning"
                                    />
                                </div>

                                <Chart
                                    title="Meeting Frequency Trends"
                                    type="line"
                                    data={reportsData?.charts?.meeting_trends}
                                    height="400px"
                                />

                                <ThemedCard className="p-6">
                                    <h4 className="font-medium text-theme-primary mb-4">Meeting Performance Metrics</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-600">85%</p>
                                            <p className="text-sm text-theme-secondary">On-time Start Rate</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-blue-600">45 min</p>
                                            <p className="text-sm text-theme-secondary">Average Duration</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-purple-600">92%</p>
                                            <p className="text-sm text-theme-secondary">Attendance Rate</p>
                                        </div>
                                    </div>
                                </ThemedCard>
                            </div>
                        )}

                        {activeTab === 'performance' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-theme-primary">Performance Metrics</h3>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <Chart
                                        title="Overall System Performance"
                                        type="line"
                                        data={{
                                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                                            data: [85, 88, 92, 89, 94, 96]
                                        }}
                                        height="300px"
                                    />
                                    <Chart
                                        title="Module Efficiency"
                                        type="bar"
                                        data={{
                                            labels: ['Users', 'Calendar', 'Meetings', 'Tasks'],
                                            data: [92, 88, 95, 87]
                                        }}
                                        height="300px"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <ThemedCard className="p-6 text-center">
                                        <div className="text-3xl font-bold text-green-600">96%</div>
                                        <div className="text-sm text-green-700 mt-1">System Uptime</div>
                                    </ThemedCard>
                                    <ThemedCard className="p-6 text-center">
                                        <div className="text-3xl font-bold text-blue-600">1.2s</div>
                                        <div className="text-sm text-blue-700 mt-1">Avg Response Time</div>
                                    </ThemedCard>
                                    <ThemedCard className="p-6 text-center">
                                        <div className="text-3xl font-bold text-purple-600">89%</div>
                                        <div className="text-sm text-purple-700 mt-1">User Satisfaction</div>
                                    </ThemedCard>
                                    <ThemedCard className="p-6 text-center">
                                        <div className="text-3xl font-bold text-yellow-600">0.02%</div>
                                        <div className="text-sm text-yellow-700 mt-1">Error Rate</div>
                                    </ThemedCard>
                                </div>
                            </div>
                        )}
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}