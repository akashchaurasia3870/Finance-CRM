import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function SystemBehavior() {
    const [activeTab, setActiveTab] = useState('landing');
    const { data, setData, put, processing } = useForm({
        default_landing_page: '/dashboard',
        record_ownership: 'creator',
        auto_assignment_enabled: false,
        auto_assignment_rules: [],
        duplicate_detection_enabled: true,
        duplicate_fields: ['email', 'phone'],
        data_validation_enabled: true,
        validation_rules: {}
    });

    const landingPages = [
        { value: '/dashboard', label: 'Dashboard' },
        { value: '/leads', label: 'Leads' },
        { value: '/clients', label: 'Clients' },
        { value: '/calendar', label: 'Calendar' },
        { value: '/tasks', label: 'Tasks' },
        { value: '/reports', label: 'Reports' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/api/settings/system-behavior');
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">System Behavior Settings</h1>
                        <p className="text-theme-secondary">Configure system behavior and business rules</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-theme">
                    <nav className="-mb-px flex space-x-8">
                        {['landing', 'ownership', 'assignment', 'duplicates', 'validation'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-theme-accent text-theme-accent'
                                        : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
                                }`}
                            >
                                {tab === 'landing' ? 'Landing Page' : 
                                 tab === 'ownership' ? 'Record Ownership' :
                                 tab === 'assignment' ? 'Auto Assignment' :
                                 tab === 'duplicates' ? 'Duplicate Detection' :
                                 'Data Validation'}
                            </button>
                        ))}
                    </nav>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Landing Page Settings */}
                    {activeTab === 'landing' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Default Landing Page</h3>
                            </div>
                            <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Default Page After Login
                                    </label>
                                    <select
                                        value={data.default_landing_page}
                                        onChange={(e) => setData('default_landing_page', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        {landingPages.map((page) => (
                                            <option key={page.value} value={page.value}>
                                                {page.label}
                                            </option>
                                        ))}
                                    </select>
                                    <p className="text-xs text-theme-muted mt-1">
                                        Users will be redirected to this page after successful login
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Role-based Landing Pages</h4>
                                    <div className="space-y-3">
                                        {['Admin', 'Manager', 'Sales Rep', 'Viewer'].map((role) => (
                                            <div key={role} className="flex items-center justify-between p-3 border rounded">
                                                <span className="text-sm font-medium">{role}</span>
                                                <select className="border border-gray-300 rounded-md px-3 py-2">
                                                    <option value="">Use Default</option>
                                                    {landingPages.map((page) => (
                                                        <option key={page.value} value={page.value}>
                                                            {page.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            </div>
                        </ThemedCard>
                    )}

                    {/* Record Ownership Rules */}
                    {activeTab === 'ownership' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Record Ownership Rules</h3>
                            </div>
                            <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Default Record Owner
                                    </label>
                                    <select
                                        value={data.record_ownership}
                                        onChange={(e) => setData('record_ownership', e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    >
                                        <option value="creator">Record Creator</option>
                                        <option value="assigned">Assigned User</option>
                                        <option value="manager">User's Manager</option>
                                        <option value="admin">System Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Ownership Transfer Rules</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Allow users to transfer ownership</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Require manager approval for transfers</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Notify previous owner of transfers</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Access Control</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Owners have full access to their records</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Team members can view shared records</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="ml-2 text-gray-700">Managers can access all team records</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </ThemedCard>
                    )}

                    {/* Auto-Assignment Rules */}
                    {activeTab === 'assignment' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Auto-Assignment Rules</h3>
                            </div>
                            <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.auto_assignment_enabled}
                                            onChange={(e) => setData('auto_assignment_enabled', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">Enable Auto-Assignment</span>
                                    </label>
                                    <p className="text-xs text-theme-muted mt-1 ml-6">
                                        Automatically assign new records to users based on rules
                                    </p>
                                </div>
                                
                                {data.auto_assignment_enabled && (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Assignment Method</h4>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input type="radio" name="assignment_method" defaultChecked className="border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Round Robin (Equal distribution)</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="assignment_method" className="border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Load Balancing (Based on current workload)</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="assignment_method" className="border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Territory-based (Geographic assignment)</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="assignment_method" className="border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Skill-based (Match expertise)</span>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Assignment Rules</h4>
                                            <div className="space-y-3">
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium">New Leads</span>
                                                        <button type="button" className="text-red-600 text-sm">Remove</button>
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                                        <select className="border border-gray-300 rounded px-2 py-1">
                                                            <option>Source</option>
                                                            <option>Industry</option>
                                                            <option>Location</option>
                                                        </select>
                                                        <select className="border border-gray-300 rounded px-2 py-1">
                                                            <option>equals</option>
                                                            <option>contains</option>
                                                            <option>starts with</option>
                                                        </select>
                                                        <input type="text" placeholder="Value" className="border border-gray-300 rounded px-2 py-1" />
                                                    </div>
                                                    <div className="mt-2">
                                                        <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                                                            <option>Assign to: John Doe</option>
                                                            <option>Assign to: Jane Smith</option>
                                                            <option>Assign to: Sales Team</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <button type="button" className="text-blue-600 text-sm">+ Add Assignment Rule</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                        </ThemedCard>
                    )}

                    {/* Duplicate Detection */}
                    {activeTab === 'duplicates' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Duplicate Detection Rules</h3>
                            </div>
                            <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.duplicate_detection_enabled}
                                            onChange={(e) => setData('duplicate_detection_enabled', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">Enable Duplicate Detection</span>
                                    </label>
                                </div>
                                
                                {data.duplicate_detection_enabled && (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Detection Fields</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['Email', 'Phone', 'Company Name', 'First & Last Name', 'Address', 'Tax ID'].map((field) => (
                                                    <label key={field} className="flex items-center">
                                                        <input 
                                                            type="checkbox" 
                                                            defaultChecked={field === 'Email' || field === 'Phone'}
                                                            className="rounded border-gray-300" 
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{field}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Detection Behavior</h4>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input type="radio" name="duplicate_behavior" defaultChecked className="border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Warn user and allow creation</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="duplicate_behavior" className="border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Block creation of duplicates</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="radio" name="duplicate_behavior" className="border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Auto-merge with existing record</span>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Matching Sensitivity</h4>
                                            <div className="space-y-2">
                                                <label className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">Exact Match</span>
                                                    <input type="radio" name="match_sensitivity" defaultChecked className="border-gray-300" />
                                                </label>
                                                <label className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">Fuzzy Match (90% similarity)</span>
                                                    <input type="radio" name="match_sensitivity" className="border-gray-300" />
                                                </label>
                                                <label className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-700">Loose Match (80% similarity)</span>
                                                    <input type="radio" name="match_sensitivity" className="border-gray-300" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                        </ThemedCard>
                    )}

                    {/* Data Validation */}
                    {activeTab === 'validation' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Data Validation Rules</h3>
                            </div>
                            <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.data_validation_enabled}
                                            onChange={(e) => setData('data_validation_enabled', e.target.checked)}
                                            className="rounded border-gray-300"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">Enable Data Validation</span>
                                    </label>
                                </div>
                                
                                {data.data_validation_enabled && (
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Required Fields</h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['First Name', 'Last Name', 'Email', 'Phone', 'Company', 'Industry', 'Source', 'Status'].map((field) => (
                                                    <label key={field} className="flex items-center">
                                                        <input 
                                                            type="checkbox" 
                                                            defaultChecked={['First Name', 'Last Name', 'Email'].includes(field)}
                                                            className="rounded border-gray-300" 
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">{field}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Format Validation</h4>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Validate email format</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Validate phone number format</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="rounded border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Validate postal codes</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="rounded border-gray-300" />
                                                    <span className="ml-2 text-sm text-gray-700">Validate URLs</span>
                                                </label>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-700 mb-3">Custom Validation Rules</h4>
                                            <div className="space-y-3">
                                                <div className="border rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium">Phone Number Length</span>
                                                        <button type="button" className="text-red-600 text-sm">Remove</button>
                                                    </div>
                                                    <div className="grid grid-cols-4 gap-2 text-sm">
                                                        <select className="border border-gray-300 rounded px-2 py-1">
                                                            <option>Phone</option>
                                                            <option>Email</option>
                                                            <option>Company</option>
                                                        </select>
                                                        <select className="border border-gray-300 rounded px-2 py-1">
                                                            <option>min length</option>
                                                            <option>max length</option>
                                                            <option>regex</option>
                                                        </select>
                                                        <input type="text" placeholder="10" className="border border-gray-300 rounded px-2 py-1" />
                                                        <input type="text" placeholder="Error message" className="border border-gray-300 rounded px-2 py-1" />
                                                    </div>
                                                </div>
                                                <button type="button" className="text-blue-600 text-sm">+ Add Validation Rule</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                        </ThemedCard>
                    )}

                    <div className="flex justify-end">
                        <ThemedButton
                            type="submit"
                            variant="primary"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save System Behavior Settings'}
                        </ThemedButton>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
