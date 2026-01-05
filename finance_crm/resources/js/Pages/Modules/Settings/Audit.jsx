import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Audit & Activity Settings</h1>
                        <p className="text-theme-secondary">Configure activity logging and system monitoring</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-theme">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'settings'
                                    ? 'border-theme-accent text-theme-accent'
                                    : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
                            }`}
                        >
                            Audit Settings
                        </button>
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'logs'
                                    ? 'border-theme-accent text-theme-accent'
                                    : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
                            }`}
                        >
                            Activity Logs
                        </button>
                        <button
                            onClick={() => setActiveTab('reports')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'reports'
                                    ? 'border-theme-accent text-theme-accent'
                                    : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
                            }`}
                        >
                            Reports
                        </button>
                    </nav>
                </div>

                {/* Audit Settings */}
                {activeTab === 'settings' && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Activity Logging Configuration</h3>
                        </div>
                        <div className="p-6">
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
                                <p className="text-xs text-theme-muted mt-1 ml-6">Track all user actions and system changes</p>
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
                                <p className="text-xs text-theme-muted mt-1">Logs older than this will be automatically deleted</p>
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

                            <ThemedButton
                                type="submit"
                                variant="primary"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Audit Settings'}
                            </ThemedButton>
                        </form>
                        </div>
                    </ThemedCard>
                )}

                {/* Activity Logs */}
                {activeTab === 'logs' && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-theme-primary">System Change History</h3>
                                <div className="flex space-x-2">
                                    <ThemedInput
                                        type="text"
                                        placeholder="Search logs..."
                                        className="w-64"
                                    />
                                    <ThemedButton
                                        onClick={handleExport}
                                        variant="success"
                                    >
                                        Export Logs
                                    </ThemedButton>
                                </div>
                            </div>
                        </div>
                        <ThemedTable>
                            <ThemedTableHeader>
                                <ThemedTableRow>
                                    <ThemedTableCell header>User</ThemedTableCell>
                                    <ThemedTableCell header>Action</ThemedTableCell>
                                    <ThemedTableCell header>Resource</ThemedTableCell>
                                    <ThemedTableCell header>Timestamp</ThemedTableCell>
                                    <ThemedTableCell header>IP Address</ThemedTableCell>
                                    <ThemedTableCell header>Details</ThemedTableCell>
                                </ThemedTableRow>
                            </ThemedTableHeader>
                            <ThemedTableBody>
                                {auditLogs.map((log) => (
                                    <ThemedTableRow key={log.id}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{log.user}</div>
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <ThemedBadge variant={
                                                log.action.includes('Failed') ? 'error' :
                                                log.action.includes('Created') ? 'success' :
                                                'info'
                                            }>
                                                {log.action}
                                            </ThemedBadge>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {log.resource}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {log.timestamp}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {log.ip_address}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-secondary">
                                            {log.details}
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                ))}
                            </ThemedTableBody>
                        </ThemedTable>
                    </ThemedCard>
                )}

                {/* Reports */}
                {activeTab === 'reports' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Activity Summary</h3>
                            </div>
                            <div className="p-6">
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
                        </ThemedCard>

                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Generate Reports</h3>
                            </div>
                            <div className="p-6">
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
                                <ThemedButton variant="primary" className="w-full">
                                    Generate Report
                                </ThemedButton>
                            </div>
                            </div>
                        </ThemedCard>
                    </div>
                )}
            </div>
        </Layout>
    );
}
