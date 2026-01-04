import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';

export default function IntegrationSettings() {
    const [activeTab, setActiveTab] = useState('available');
    const { data, setData, post, delete: destroy, processing } = useForm({
        integration_name: '',
        api_keys: {},
        configuration: {}
    });

    const availableIntegrations = [
        {
            name: 'Salesforce',
            description: 'Sync leads and contacts with Salesforce CRM',
            fields: ['api_key', 'secret_key', 'instance_url'],
            enabled: false
        },
        {
            name: 'MailChimp',
            description: 'Email marketing and campaign management',
            fields: ['api_key', 'server_prefix'],
            enabled: false
        },
        {
            name: 'Stripe',
            description: 'Payment processing and subscription management',
            fields: ['publishable_key', 'secret_key', 'webhook_secret'],
            enabled: false
        },
        {
            name: 'Twilio',
            description: 'SMS notifications and communication',
            fields: ['account_sid', 'auth_token', 'phone_number'],
            enabled: false
        }
    ];

    const enabledIntegrations = [
        {
            name: 'Google Calendar',
            description: 'Calendar synchronization',
            status: 'Active',
            lastSync: '2024-01-15 10:30 AM'
        }
    ];

    const handleEnableIntegration = (integration) => {
        setData({
            integration_name: integration.name,
            api_keys: {},
            configuration: {}
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/api/settings/integrations/enable');
    };

    const handleDisable = (integrationName) => {
        destroy(`/api/settings/integrations/${integrationName}`);
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
                    <h1 className="text-2xl font-bold text-gray-900">Integration Settings</h1>
                    <p className="text-gray-600">Manage third-party integrations and API keys</p>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('available')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'available'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Available Integrations
                        </button>
                        <button
                            onClick={() => setActiveTab('enabled')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'enabled'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Enabled Integrations
                        </button>
                    </nav>
                </div>

                {/* Available Integrations */}
                {activeTab === 'available' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {availableIntegrations.map((integration) => (
                            <div key={integration.name} className="bg-white border rounded-lg p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                                        <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                                        <div className="mt-3">
                                            <span className="text-xs text-gray-400">Required fields:</span>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {integration.fields.map((field) => (
                                                    <span key={field} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                                        {field.replace('_', ' ')}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleEnableIntegration(integration)}
                                        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                                    >
                                        Enable
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Enabled Integrations */}
                {activeTab === 'enabled' && (
                    <div className="space-y-4">
                        {enabledIntegrations.length > 0 ? (
                            enabledIntegrations.map((integration) => (
                                <div key={integration.name} className="bg-white border rounded-lg p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3">
                                                <h3 className="text-lg font-medium text-gray-900">{integration.name}</h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {integration.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">{integration.description}</p>
                                            <p className="text-xs text-gray-400 mt-2">Last sync: {integration.lastSync}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200">
                                                Configure
                                            </button>
                                            <button
                                                onClick={() => handleDisable(integration.name)}
                                                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                                            >
                                                Disable
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white border rounded-lg p-6 text-center">
                                <p className="text-gray-500">No integrations enabled yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}