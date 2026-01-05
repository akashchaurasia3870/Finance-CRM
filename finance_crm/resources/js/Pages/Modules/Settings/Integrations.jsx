import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Integration Settings</h1>
                        <p className="text-theme-secondary">Manage third-party integrations and API keys</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-theme">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('available')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'available'
                                    ? 'border-theme-accent text-theme-accent'
                                    : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
                            }`}
                        >
                            Available Integrations
                        </button>
                        <button
                            onClick={() => setActiveTab('enabled')}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === 'enabled'
                                    ? 'border-theme-accent text-theme-accent'
                                    : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
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
                            <ThemedCard key={integration.name}>
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-theme-primary">{integration.name}</h3>
                                            <p className="text-sm text-theme-secondary mt-1">{integration.description}</p>
                                            <div className="mt-3">
                                                <span className="text-xs text-theme-muted">Required fields:</span>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {integration.fields.map((field) => (
                                                        <span key={field} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-theme-muted text-theme-primary">
                                                            {field.replace('_', ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <ThemedButton
                                            onClick={() => handleEnableIntegration(integration)}
                                            variant="primary"
                                            className="ml-4"
                                        >
                                            Enable
                                        </ThemedButton>
                                    </div>
                                </div>
                            </ThemedCard>
                        ))}
                    </div>
                )}

                {/* Enabled Integrations */}
                {activeTab === 'enabled' && (
                    <div className="space-y-4">
                        {enabledIntegrations.length > 0 ? (
                            enabledIntegrations.map((integration) => (
                                <ThemedCard key={integration.name}>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="text-lg font-medium text-theme-primary">{integration.name}</h3>
                                                    <ThemedBadge variant="success">
                                                        {integration.status}
                                                    </ThemedBadge>
                                                </div>
                                                <p className="text-sm text-theme-secondary mt-1">{integration.description}</p>
                                                <p className="text-xs text-theme-muted mt-2">Last sync: {integration.lastSync}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <ThemedButton variant="secondary">
                                                    Configure
                                                </ThemedButton>
                                                <ThemedButton
                                                    onClick={() => handleDisable(integration.name)}
                                                    variant="error"
                                                >
                                                    Disable
                                                </ThemedButton>
                                            </div>
                                        </div>
                                    </div>
                                </ThemedCard>
                            ))
                        ) : (
                            <ThemedCard>
                                <div className="p-6 text-center">
                                    <p className="text-theme-muted">No integrations enabled yet.</p>
                                </div>
                            </ThemedCard>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
