import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import StatCard from '@/Components/Dashboard/StatCard';
import Chart from '@/Components/Dashboard/Chart';
import FilterPanel from '@/Components/Dashboard/FilterPanel';
import { Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function DashboardIndex() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ dateRange: '30', status: 'all', type: 'all' });

    useEffect(() => {
        fetchDashboardData();
    }, [filters]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/dashboard?${new URLSearchParams(filters)}`);
            const data = await response.json();
            setDashboardData(data.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
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
                    <div className="text-lg text-theme-secondary">Loading dashboard...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-theme-primary">Dashboard</h1>
                        <p className="text-theme-secondary">Welcome to Finance CRM Dashboard</p>
                    </div>
                    <div className="flex space-x-3">
                        <ThemedButton
                            href="/dashboard/reports"
                            variant="primary"
                        >
                            View Reports
                        </ThemedButton>
                    </div>
                </div>

                <FilterPanel onFilterChange={handleFilterChange} filters={filters} />

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Users"
                        value={dashboardData?.users?.total || 0}
                        icon="👥"
                        color="primary"
                        trend={{
                            direction: dashboardData?.users?.growth_rate > 0 ? 'up' : 'down',
                            value: Math.abs(dashboardData?.users?.growth_rate || 0),
                            period: 'vs last period'
                        }}
                        subtitle={`${dashboardData?.users?.new_this_month || 0} new this month`}
                    />
                    <StatCard
                        title="Active Clients"
                        value={dashboardData?.clients?.active_clients || 0}
                        icon="🏢"
                        color="success"
                        trend={{
                            direction: dashboardData?.clients?.client_growth > 0 ? 'up' : 'down',
                            value: Math.abs(dashboardData?.clients?.client_growth || 0),
                            period: 'growth rate'
                        }}
                        subtitle={`${dashboardData?.clients?.new_clients || 0} new clients`}
                    />
                    <StatCard
                        title="Pending Tasks"
                        value={dashboardData?.tasks?.pending_tasks || 0}
                        icon="📋"
                        color="warning"
                        subtitle={`${dashboardData?.tasks?.overdue_tasks || 0} overdue`}
                    />
                    <StatCard
                        title="Upcoming Meetings"
                        value={dashboardData?.meetings?.upcoming_meetings || 0}
                        icon="📅"
                        color="info"
                        subtitle={`${dashboardData?.meetings?.meetings_this_week || 0} this week`}
                    />
                </div>

                {/* Module Quick Access */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/dashboard/users" className="block">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">User Management</h3>
                                    <p className="text-blue-100 mt-2">Manage users, roles and permissions</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold">{dashboardData?.users?.total || 0}</span>
                                        <span className="text-blue-200 ml-2">Total Users</span>
                                    </div>
                                </div>
                                <div className="text-4xl opacity-80">👥</div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/calendar" className="block">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">Calendar & Events</h3>
                                    <p className="text-green-100 mt-2">Schedule and manage events</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold">{dashboardData?.calendar?.upcoming_events || 0}</span>
                                        <span className="text-green-200 ml-2">Upcoming Events</span>
                                    </div>
                                </div>
                                <div className="text-4xl opacity-80">📅</div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/meetings" className="block">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">Meetings</h3>
                                    <p className="text-purple-100 mt-2">Track and manage meetings</p>
                                    <div className="mt-4">
                                        <span className="text-2xl font-bold">{dashboardData?.meetings?.total_meetings || 0}</span>
                                        <span className="text-purple-200 ml-2">Total Meetings</span>
                                    </div>
                                </div>
                                <div className="text-4xl opacity-80">🤝</div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Chart
                        title="User Growth Trend"
                        type="line"
                        data={dashboardData?.charts?.user_growth}
                        height="300px"
                    />
                    <Chart
                        title="Meeting Trends"
                        type="bar"
                        data={dashboardData?.charts?.meeting_trends}
                        height="300px"
                    />
                    <Chart
                        title="Client Acquisition"
                        type="line"
                        data={dashboardData?.charts?.client_acquisition}
                        height="300px"
                    />
                    <Chart
                        title="Task Completion Status"
                        type="pie"
                        data={dashboardData?.charts?.task_completion}
                        height="300px"
                    />
                </div>

                {/* Recent Activity */}
                <ThemedCard className="p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-theme-secondary">New user registered: John Doe</span>
                            <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm text-theme-secondary">Meeting scheduled with ABC Corp</span>
                            <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span className="text-sm text-theme-secondary">Task deadline approaching: Q4 Report</span>
                            <span className="text-xs text-gray-400 ml-auto">6 hours ago</span>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}