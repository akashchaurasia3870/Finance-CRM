import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Data Management</h1>
                        <p className="text-theme-secondary">Configure data import, export, and retention policies</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-theme">
                    <nav className="-mb-px flex space-x-8">
                        {['import', 'export', 'retention', 'backup'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-theme-accent text-theme-accent'
                                        : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
                                }`}
                            >
                                {tab} Configuration
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Import Configuration */}
                {activeTab === 'import' && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Import Data Configuration</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Supported File Formats
                                    </label>
                                    <div className="space-y-2">
                                        {['CSV', 'Excel (XLSX)', 'JSON', 'XML'].map((format) => (
                                            <label key={format} className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-theme" />
                                                <span className="ml-2 text-sm text-theme-primary">{format}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Maximum File Size (MB)
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        defaultValue={50}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" defaultChecked className="rounded border-theme" />
                                        <span className="ml-2 text-sm text-theme-primary">Validate data before import</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="rounded border-theme" />
                                        <span className="ml-2 text-sm text-theme-primary">Skip duplicate records</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {/* Export Configuration */}
                {activeTab === 'export' && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Export Data Permissions</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Default Export Format
                                    </label>
                                    <select
                                        value={data.export_format}
                                        onChange={(e) => setData('export_format', e.target.value)}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="csv">CSV</option>
                                        <option value="xlsx">Excel (XLSX)</option>
                                        <option value="json">JSON</option>
                                        <option value="pdf">PDF</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Export Permissions by Role
                                    </label>
                                    <div className="space-y-2">
                                        {['Admin', 'Manager', 'User', 'Viewer'].map((role) => (
                                            <div key={role} className="flex items-center justify-between p-3 border border-theme rounded">
                                                <span className="text-sm font-medium text-theme-primary">{role}</span>
                                                <div className="space-x-4">
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked={role === 'Admin' || role === 'Manager'} className="rounded border-theme" />
                                                        <span className="ml-1 text-xs text-theme-secondary">All Data</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-theme" />
                                                        <span className="ml-1 text-xs text-theme-secondary">Own Data</span>
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}

                {/* Retention Policies */}
                {activeTab === 'retention' && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Data Retention Policies</h3>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Data Retention Period (Days)
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        value={data.retention_days}
                                        onChange={(e) => setData('retention_days', e.target.value)}
                                        min="30"
                                    />
                                    <p className="text-xs text-theme-muted mt-1">Minimum 30 days required</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Soft Delete / Permanent Delete Rules
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="radio" name="delete_rule" defaultChecked className="border-theme" />
                                            <span className="ml-2 text-sm text-theme-primary">Soft delete first, permanent delete after retention period</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="delete_rule" className="border-theme" />
                                            <span className="ml-2 text-sm text-theme-primary">Permanent delete immediately</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="delete_rule" className="border-theme" />
                                            <span className="ml-2 text-sm text-theme-primary">Never permanently delete</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.auto_delete_enabled}
                                            onChange={(e) => setData('auto_delete_enabled', e.target.checked)}
                                            className="rounded border-theme"
                                        />
                                        <span className="ml-2 text-sm text-theme-primary">Enable automatic deletion of expired data</span>
                                    </label>
                                </div>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Retention Policy'}
                                </ThemedButton>
                            </form>
                        </div>
                    </ThemedCard>
                )}

                {/* Backup Configuration */}
                {activeTab === 'backup' && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Backup Configuration</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Backup Frequency
                                    </label>
                                    <select
                                        value={data.backup_frequency}
                                        onChange={(e) => setData('backup_frequency', e.target.value)}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Backup Storage Location
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="radio" name="backup_location" defaultChecked className="border-theme" />
                                            <span className="ml-2 text-sm text-theme-primary">Local Server</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="backup_location" className="border-theme" />
                                            <span className="ml-2 text-sm text-theme-primary">AWS S3</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" name="backup_location" className="border-theme" />
                                            <span className="ml-2 text-sm text-theme-primary">Google Cloud Storage</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Backup Retention (Days)
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        defaultValue={30}
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <ThemedButton variant="primary">
                                        Save Configuration
                                    </ThemedButton>
                                    <ThemedButton variant="success">
                                        Run Backup Now
                                    </ThemedButton>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}
            </div>
        </Layout>
    );
}
