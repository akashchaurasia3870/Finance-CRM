import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';

export default function DataManagement() {
    const [activeTab, setActiveTab] = useState('import');
    const { data, setData, put, processing } = useForm({
        retention_days: 365,
        backup_frequency: 'daily',
        auto_delete_enabled: false,
        export_format: 'csv'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/api/settings/data-retention');
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
                    <h1 className="text-2xl font-bold text-gray-900">Data Management</h1>
                    <p className="text-gray-600">Configure data import, export, and retention policies</p>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {['import', 'export', 'retention', 'backup'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                {tab} Configuration
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Import Configuration */}
                {activeTab === 'import' && (
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Import Data Configuration</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Supported File Formats
                                </label>
                                <div className="space-y-2">
                                    {['CSV', 'Excel (XLSX)', 'JSON', 'XML'].map((format) => (
                                        <label key={format} className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">{format}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Maximum File Size (MB)
                                </label>
                                <input
                                    type="number"
                                    defaultValue={50}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                    <span className="ml-2 text-sm text-gray-700">Validate data before import</span>
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300" />
                                    <span className="ml-2 text-sm text-gray-700">Skip duplicate records</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Export Configuration */}
                {activeTab === 'export' && (
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Export Data Permissions</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Default Export Format
                                </label>
                                <select
                                    value={data.export_format}
                                    onChange={(e) => setData('export_format', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="csv">CSV</option>
                                    <option value="xlsx">Excel (XLSX)</option>
                                    <option value="json">JSON</option>
                                    <option value="pdf">PDF</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Export Permissions by Role
                                </label>
                                <div className="space-y-2">
                                    {['Admin', 'Manager', 'User', 'Viewer'].map((role) => (
                                        <div key={role} className="flex items-center justify-between p-3 border rounded">
                                            <span className="text-sm font-medium">{role}</span>
                                            <div className="space-x-4">
                                                <label className="flex items-center">
                                                    <input type="checkbox" defaultChecked={role === 'Admin' || role === 'Manager'} className="rounded border-gray-300" />
                                                    <span className="ml-1 text-xs text-gray-600">All Data</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                    <span className="ml-1 text-xs text-gray-600">Own Data</span>
                                                </label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Retention Policies */}
                {activeTab === 'retention' && (
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Data Retention Policies</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Data Retention Period (Days)
                                </label>
                                <input
                                    type="number"
                                    value={data.retention_days}
                                    onChange={(e) => setData('retention_days', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    min="30"
                                />
                                <p className="text-xs text-gray-500 mt-1">Minimum 30 days required</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Soft Delete / Permanent Delete Rules
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="radio" name="delete_rule" defaultChecked className="border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Soft delete first, permanent delete after retention period</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="delete_rule" className="border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Permanent delete immediately</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="delete_rule" className="border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Never permanently delete</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.auto_delete_enabled}
                                        onChange={(e) => setData('auto_delete_enabled', e.target.checked)}
                                        className="rounded border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Enable automatic deletion of expired data</span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Retention Policy'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Backup Configuration */}
                {activeTab === 'backup' && (
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Backup Configuration</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Backup Frequency
                                </label>
                                <select
                                    value={data.backup_frequency}
                                    onChange={(e) => setData('backup_frequency', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                >
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Backup Storage Location
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="radio" name="backup_location" defaultChecked className="border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Local Server</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="backup_location" className="border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">AWS S3</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="radio" name="backup_location" className="border-gray-300" />
                                        <span className="ml-2 text-sm text-gray-700">Google Cloud Storage</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Backup Retention (Days)
                                </label>
                                <input
                                    type="number"
                                    defaultValue={30}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                    Save Configuration
                                </button>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                                    Run Backup Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}