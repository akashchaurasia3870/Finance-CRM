import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge, ThemedSelect } from '@/Components/ThemedComponents';

export default function Audit({ siteLogs = [], filters = {} }) {
    const [activeTab, setActiveTab] = useState('logs');
    const [showModal, setShowModal] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [ipFilter, setIpFilter] = useState(filters.ip_address || '');
    const [methodFilter, setMethodFilter] = useState(filters.method || '');
    const [userFilter, setUserFilter] = useState(filters.user_id || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');
    
    const { data, setData, put, get, processing } = useForm({
        activity_logging_enabled: true,
        log_retention_days: 90,
        track_user_actions: true,
        track_system_changes: true,
        track_login_attempts: true,
        export_format: 'csv'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/api/settings/audit');
    };

    const handleExport = () => {
        const params = new URLSearchParams({
            search: searchTerm,
            ip_address: ipFilter,
            method: methodFilter,
            user_id: userFilter,
            date_from: dateFrom,
            date_to: dateTo
        });
        window.location.href = `/settings/audit/export?${params.toString()}`;
    };

    const handleFilter = () => {
        router.get('/settings/audit', {
            search: searchTerm,
            ip_address: ipFilter,
            method: methodFilter,
            user_id: userFilter,
            date_from: dateFrom,
            date_to: dateTo
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearchTerm('');
        setIpFilter('');
        setMethodFilter('');
        setUserFilter('');
        setDateFrom('');
        setDateTo('');
        router.get('/settings/audit', {}, { preserveState: true });
    };

    const viewHeaders = (log) => {
        setSelectedLog(log);
        setShowModal(true);
    };

    const parseHeaders = (headers) => {
        try {
            return typeof headers === 'string' ? JSON.parse(headers) : headers;
        } catch (e) {
            return headers;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
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
                            Site Logs
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
                                <ThemedInput
                                    type="number"
                                    value={data.log_retention_days}
                                    onChange={(e) => setData('log_retention_days', e.target.value)}
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

                {/* Site Logs */}
                {activeTab === 'logs' && (
                    <div className="space-y-4">
                        {/* Filters */}
                        <ThemedCard>
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-theme-primary mb-4">Filters</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                    <ThemedInput
                                        type="text"
                                        placeholder="Search URL..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <ThemedInput
                                        type="text"
                                        placeholder="IP Address"
                                        value={ipFilter}
                                        onChange={(e) => setIpFilter(e.target.value)}
                                    />
                                    <ThemedSelect
                                        value={methodFilter}
                                        onChange={(e) => setMethodFilter(e.target.value)}
                                    >
                                        <option value="">All Methods</option>
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="DELETE">DELETE</option>
                                    </ThemedSelect>
                                    <ThemedInput
                                        type="text"
                                        placeholder="User ID"
                                        value={userFilter}
                                        onChange={(e) => setUserFilter(e.target.value)}
                                    />
                                    <ThemedInput
                                        type="date"
                                        placeholder="From Date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                    />
                                    <ThemedInput
                                        type="date"
                                        placeholder="To Date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                    />
                                </div>
                                <div className="flex space-x-2 mt-4">
                                    <ThemedButton onClick={handleFilter} variant="primary">
                                        Apply Filters
                                    </ThemedButton>
                                    <ThemedButton onClick={clearFilters} variant="secondary">
                                        Clear
                                    </ThemedButton>
                                    <ThemedButton onClick={handleExport} variant="success">
                                        Export
                                    </ThemedButton>
                                </div>
                            </div>
                        </ThemedCard>

                        {/* Logs Table */}
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Site Access Logs ({siteLogs.length})</h3>
                            </div>
                            <ThemedTable>
                                <ThemedTableHeader>
                                    <ThemedTableRow>
                                        <ThemedTableCell header>IP Address</ThemedTableCell>
                                        <ThemedTableCell header>Method</ThemedTableCell>
                                        <ThemedTableCell header>URL</ThemedTableCell>
                                        <ThemedTableCell header>User ID</ThemedTableCell>
                                        <ThemedTableCell header>Browser</ThemedTableCell>
                                        <ThemedTableCell header>Platform</ThemedTableCell>
                                        <ThemedTableCell header>Timestamp</ThemedTableCell>
                                        <ThemedTableCell header>Actions</ThemedTableCell>
                                    </ThemedTableRow>
                                </ThemedTableHeader>
                                <ThemedTableBody>
                                    {siteLogs.length > 0 ? siteLogs.map((log) => (
                                        <ThemedTableRow key={log.id}>
                                            <ThemedTableCell className="text-theme-secondary">
                                                {log.ip_address}
                                            </ThemedTableCell>
                                            <ThemedTableCell>
                                                <ThemedBadge variant={
                                                    log.method === 'GET' ? 'info' :
                                                    log.method === 'POST' ? 'success' :
                                                    log.method === 'PUT' ? 'warning' :
                                                    log.method === 'DELETE' ? 'error' : 'secondary'
                                                }>
                                                    {log.method}
                                                </ThemedBadge>
                                            </ThemedTableCell>
                                            <ThemedTableCell className="text-theme-primary max-w-xs">
                                                <div className="truncate" title={log.url}>
                                                    {log.url}
                                                </div>
                                            </ThemedTableCell>
                                            <ThemedTableCell className="text-theme-secondary">
                                                {log.user_id || 'Guest'}
                                            </ThemedTableCell>
                                            <ThemedTableCell className="text-theme-secondary">
                                                {log.browser || 'Unknown'}
                                            </ThemedTableCell>
                                            <ThemedTableCell className="text-theme-secondary">
                                                {log.platform || 'Unknown'}
                                            </ThemedTableCell>
                                            <ThemedTableCell className="text-theme-secondary">
                                                {formatDate(log.created_at)}
                                            </ThemedTableCell>
                                            <ThemedTableCell>
                                                <ThemedButton
                                                    onClick={() => viewHeaders(log)}
                                                    variant="secondary"
                                                    size="sm"
                                                >
                                                    Details
                                                </ThemedButton>
                                            </ThemedTableCell>
                                        </ThemedTableRow>
                                    )) : (
                                        <ThemedTableRow>
                                            <ThemedTableCell colSpan={8} className="text-center text-theme-muted py-8">
                                                No logs found
                                            </ThemedTableCell>
                                        </ThemedTableRow>
                                    )}
                                </ThemedTableBody>
                            </ThemedTable>
                        </ThemedCard>
                    </div>
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
                                    <ThemedSelect>
                                        <option>User Activity Report</option>
                                        <option>Security Events Report</option>
                                        <option>System Changes Report</option>
                                        <option>Login History Report</option>
                                    </ThemedSelect>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <ThemedInput type="date" />
                                        <ThemedInput type="date" />
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

            {/* Headers Modal */}
            {showModal && selectedLog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-900">Log Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className="space-y-6">
                                {/* Basic Info */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-900 mb-3">Request Information</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">IP Address:</span>
                                            <span className="ml-2 text-gray-600">{selectedLog.ip_address}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Method:</span>
                                            <span className="ml-2 text-gray-600">{selectedLog.method}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="font-medium text-gray-700">URL:</span>
                                            <span className="ml-2 text-gray-600 break-all">{selectedLog.url}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">User ID:</span>
                                            <span className="ml-2 text-gray-600">{selectedLog.user_id || 'Guest'}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Timestamp:</span>
                                            <span className="ml-2 text-gray-600">{formatDate(selectedLog.created_at)}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Browser:</span>
                                            <span className="ml-2 text-gray-600">{selectedLog.browser || 'Unknown'}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Platform:</span>
                                            <span className="ml-2 text-gray-600">{selectedLog.platform || 'Unknown'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* User Agent */}
                                {selectedLog.user_agent && (
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900 mb-3">User Agent</h4>
                                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-600 break-all">
                                            {selectedLog.user_agent}
                                        </div>
                                    </div>
                                )}

                                {/* Device Info */}
                                {selectedLog.device && (
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900 mb-3">Device Information</h4>
                                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                                            {selectedLog.device}
                                        </div>
                                    </div>
                                )}

                                {/* Headers */}
                                {selectedLog.headers && (
                                    <div>
                                        <h4 className="text-md font-medium text-gray-900 mb-3">Request Headers</h4>
                                        <div className="bg-gray-50 p-4 rounded">
                                            {(() => {
                                                const headers = parseHeaders(selectedLog.headers);
                                                if (typeof headers === 'object' && headers !== null) {
                                                    return (
                                                        <div className="space-y-2">
                                                            {Object.entries(headers).map(([key, value]) => (
                                                                <div key={key} className="text-sm">
                                                                    <span className="font-medium text-gray-700">{key}:</span>
                                                                    <span className="ml-2 text-gray-600 break-all">
                                                                        {Array.isArray(value) ? value.join(', ') : String(value)}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <pre className="text-sm text-gray-600 whitespace-pre-wrap break-all">
                                                            {String(headers)}
                                                        </pre>
                                                    );
                                                }
                                            })()}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 flex justify-end">
                            <ThemedButton onClick={() => setShowModal(false)} variant="secondary">
                                Close
                            </ThemedButton>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
