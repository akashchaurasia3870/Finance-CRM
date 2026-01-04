import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';

export default function Audit() {
    const [activeTab, setActiveTab] = useState('settings');
    const { data, setData, put, get, processing } = useForm({
        activity_logging_enabled: true,
        log_retention_days: 90,
        track_user_actions: true,
        track_system_changes: true,
        track_login_attempts: true,
        export_format: 'csv'
    });

    const auditLogs = [
        {
            id: 1,
            user: 'John Doe',
            action: 'Updated Client',
            resource: 'Client #1234',
            timestamp: '2024-01-15 14:30:25',
            ip_address: '192.168.1.100',
            details: 'Changed phone number'
        },
        {
            id: 2,
            user: 'Jane Smith',
            action: 'Created Lead',
            resource: 'Lead #5678',
            timestamp: '2024-01-15 14:25:10',
            ip_address: '192.168.1.101',
            details: 'New lead from website form'
        },
        {
            id: 3,
            user: 'System',
            action: 'Login Failed',
            resource: 'User Authentication',
            timestamp: '2024-01-15 14:20:05',
            ip_address: '192.168.1.102',
            details: 'Invalid password attempt'
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/api/settings/audit');
    };

    const handleExport = () => {
        get('/api/settings/audit-logs/export');
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/settings" className="text-blue-600 hover:text-blue-800">
                        ← Back to Settings
                    </Link>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Audit & Activity Settings</h1>
                    <p className="text-gray-600">Configure activity logging and system monitoring</p>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'settings'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Audit Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'logs'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Activity Logs
                        </button>
                        <button
                            onClick={() => setActiveTab('reports')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'reports'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Reports
                        </button>
                    </nav>
                </div>

                {/* Audit Settings */}
                {activeTab === 'settings' && (
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Logging Configuration</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.activity_logging_enabled}
                                        onChange={(e) => setData('activity_logging_enabled', e.target.checked)}
                                        className="rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">Enable Activity Logging</span>
                                </label>
                                <p className="text-xs text-gray-500 mt-1 ml-6">Track all user actions and system changes</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Log Retention Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={data.log_retention_days}
                                    onChange={(e) => setData('log_retention_days', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    min="7"
                                    max="365"
                                />
                                <p className="text-xs text-gray-500 mt-1">Logs older than this will be automatically deleted</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Track User Actions
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.track_user_actions}
                                            onChange={(e) => setData('track_user_actions', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">User Actions (Create, Update, Delete)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.track_login_attempts}
                                            onChange={(e) => setData('track_login_attempts', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Login/Logout Activities</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.track_system_changes}
                                            onChange={(e) => setData('track_system_changes', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">System Configuration Changes</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional Tracking Options
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Track IP Addresses</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Track User Agent Information</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Track Failed Actions</span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Audit Settings'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Activity Logs */}
                {activeTab === 'logs' && (
                    <div className="bg-white border rounded-lg">
                        <div className="p-6 border-b">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">System Change History</h3>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Search logs..."
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    />
                                    <button
                                        onClick={handleExport}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                                    >
                                        Export Logs
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Resource
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Timestamp
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            IP Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Details
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {auditLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {log.user}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    log.action.includes('Failed') ? 'bg-red-100 text-red-800' :
                                                    log.action.includes('Created') ? 'bg-green-100 text-green-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {log.resource}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {log.timestamp}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {log.ip_address}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {log.details}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Reports */}
                {activeTab === 'reports' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Total Actions Today:</span>
                                    <span className="text-sm font-medium">247</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Failed Login Attempts:</span>
                                    <span className="text-sm font-medium text-red-600">12</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">System Changes:</span>
                                    <span className="text-sm font-medium">8</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Active Users:</span>
                                    <span className="text-sm font-medium text-green-600">23</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Reports</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Report Type
                                    </label>
                                    <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                                        <option>User Activity Report</option>
                                        <option>Security Events Report</option>
                                        <option>System Changes Report</option>
                                        <option>Login History Report</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input type="date" className="border border-gray-300 rounded-md px-3 py-2" />
                                        <input type="date" className="border border-gray-300 rounded-md px-3 py-2" />
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}