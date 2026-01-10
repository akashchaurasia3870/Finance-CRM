import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import StatCard from '@/Components/Dashboard/StatCard';
import Chart from '@/Components/Dashboard/Chart';
import FilterPanel from '@/Components/Dashboard/FilterPanel';
import { Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function UserDashboard() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ dateRange: '30', status: 'all', type: 'all' });

    useEffect(() => {
        fetchUserData();
    }, [filters]);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/dashboard/users?${new URLSearchParams(filters)}`);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
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
                    <div className="text-lg text-theme-secondary">Loading user dashboard...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-theme-primary">User Dashboard</h1>
                        <p className="text-theme-secondary">User management statistics and insights</p>
                    </div>
                    <div className="flex space-x-3">
                        <ThemedButton href="/user" variant="primary">
                            Manage Users
                        </ThemedButton>
                        <ThemedButton href="/dashboard" variant="secondary">
                            Back to Dashboard
                        </ThemedButton>
                    </div>
                </div>

                <FilterPanel onFilterChange={handleFilterChange} filters={filters} />

                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Users"
                        value={userData?.total_users || 0}
                        icon="👥"
                        color="primary"
                        subtitle="All registered users"
                    />
                    <StatCard
                        title="Active Users"
                        value={userData?.active_users || 0}
                        icon="✅"
                        color="success"
                        subtitle="Recently active"
                    />
                    <StatCard
                        title="New Registrations"
                        value={userData?.new_registrations || 0}
                        icon="🆕"
                        color="info"
                        subtitle="In selected period"
                    />
                    <StatCard
                        title="User Roles"
                        value={userData?.user_roles?.length || 0}
                        icon="🔐"
                        color="warning"
                        subtitle="Different role types"
                    />
                </div>

                {/* User Role Distribution */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Chart
                        title="User Role Distribution"
                        type="pie"
                        data={{
                            labels: userData?.user_roles?.map(role => role.role) || [],
                            data: userData?.user_roles?.map(role => role.count) || []
                        }}
                        height="300px"
                    />
                    <Chart
                        title="User Growth Over Time"
                        type="line"
                        data={userData?.monthly_growth}
                        height="300px"
                    />
                </div>

                {/* User Role Details */}
                <ThemedCard>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-theme-primary">User Roles Breakdown</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {userData?.user_roles?.map((role, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium text-theme-primary capitalize">{role.role}</h4>
                                            <p className="text-2xl font-bold text-primary-color mt-1">{role.count}</p>
                                        </div>
                                        <div className="text-2xl">
                                            {role.role === 'admin' ? '👑' : 
                                             role.role === 'manager' ? '👨‍💼' : 
                                             role.role === 'user' ? '👤' : '🔧'}
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-primary-color h-2 rounded-full" 
                                                style={{ 
                                                    width: `${(role.count / userData?.total_users) * 100}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {((role.count / userData?.total_users) * 100).toFixed(1)}% of total users
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ThemedCard>

                {/* Quick Actions */}
                <ThemedCard className="p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/user/new"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-2xl mr-3">➕</div>
                            <div>
                                <h4 className="font-medium text-theme-primary">Add New User</h4>
                                <p className="text-sm text-theme-secondary">Create a new user account</p>
                            </div>
                        </Link>
                        <Link
                            href="/role"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-2xl mr-3">🔐</div>
                            <div>
                                <h4 className="font-medium text-theme-primary">Manage Roles</h4>
                                <p className="text-sm text-theme-secondary">Configure user roles and permissions</p>
                            </div>
                        </Link>
                        <Link
                            href="/settings/users"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="text-2xl mr-3">⚙️</div>
                            <div>
                                <h4 className="font-medium text-theme-primary">User Settings</h4>
                                <p className="text-sm text-theme-secondary">Configure user management settings</p>
                            </div>
                        </Link>
                    </div>
                </ThemedCard>

                {/* Recent User Activity */}
                <ThemedCard className="p-6">
                    <h3 className="text-lg font-semibold text-theme-primary mb-4">Recent User Activity</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-sm">👤</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-theme-primary">New user registration</p>
                                <p className="text-xs text-theme-secondary">John Doe joined as Manager</p>
                            </div>
                            <span className="text-xs text-gray-400">2 hours ago</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-sm">🔄</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-theme-primary">Role updated</p>
                                <p className="text-xs text-theme-secondary">Jane Smith promoted to Admin</p>
                            </div>
                            <span className="text-xs text-gray-400">4 hours ago</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 text-sm">🔒</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-theme-primary">Account deactivated</p>
                                <p className="text-xs text-theme-secondary">User account temporarily disabled</p>
                            </div>
                            <span className="text-xs text-gray-400">1 day ago</span>
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}