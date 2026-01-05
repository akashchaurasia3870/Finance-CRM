import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function Compliance() {
    const [activeTab, setActiveTab] = useState('gdpr');
    const { data, setData, put, processing } = useForm({
        gdpr_enabled: false,
        consent_management: false,
        data_access_approvals: false,
        right_to_be_forgotten: false,
        data_portability: false,
        privacy_policy_url: '',
        terms_of_service_url: '',
        cookie_policy_url: '',
        legal_disclaimers: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/api/settings/compliance');
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Compliance & Policy Settings</h1>
                        <p className="text-theme-secondary">Configure GDPR, consent management, and legal policies</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                {/* Tab Navigation */}
                <div className="border-b border-theme">
                    <nav className="-mb-px flex space-x-8">
                        {['gdpr', 'consent', 'access', 'policies', 'disclaimers'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                                    activeTab === tab
                                        ? 'border-theme-accent text-theme-accent'
                                        : 'border-transparent text-theme-muted hover:text-theme-secondary hover:border-theme-muted'
                                }`}
                            >
                                {tab === 'gdpr' ? 'GDPR' : 
                                 tab === 'consent' ? 'Consent Management' :
                                 tab === 'access' ? 'Data Access' :
                                 tab === 'policies' ? 'Legal Policies' :
                                 'Disclaimers'}
                            </button>
                        ))}
                    </nav>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* GDPR Settings */}
                    {activeTab === 'gdpr' && (
                        <div className="space-y-6">
                            <ThemedCard>
                                <div className="p-4 border-b border-theme">
                                    <h3 className="text-lg font-medium text-theme-primary">GDPR Compliance</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={data.gdpr_enabled}
                                                    onChange={(e) => setData('gdpr_enabled', e.target.checked)}
                                                    className="rounded border-gray-300"
                                                />
                                                <span className="ml-2 text-sm font-medium text-gray-700">Enable GDPR Compliance</span>
                                            </label>
                                            <p className="text-xs text-theme-muted mt-1 ml-6">
                                                Activate GDPR data protection features and user rights
                                            </p>
                                        </div>
                                        
                                        {data.gdpr_enabled && (
                                            <div className="space-y-4 ml-6">
                                                <div>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.right_to_be_forgotten}
                                                            onChange={(e) => setData('right_to_be_forgotten', e.target.checked)}
                                                            className="rounded border-gray-300"
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">Right to be Forgotten</span>
                                                    </label>
                                                    <p className="text-xs text-theme-muted mt-1 ml-6">
                                                        Allow users to request complete data deletion
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.data_portability}
                                                            onChange={(e) => setData('data_portability', e.target.checked)}
                                                            className="rounded border-gray-300"
                                                        />
                                                        <span className="ml-2 text-sm text-gray-700">Data Portability</span>
                                                    </label>
                                                    <p className="text-xs text-theme-muted mt-1 ml-6">
                                                        Allow users to export their personal data
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Data Processing Transparency</span>
                                                    </label>
                                                    <p className="text-xs text-theme-muted mt-1 ml-6">
                                                        Provide clear information about data processing activities
                                                    </p>
                                                </div>
                                                
                                                <div>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Data Breach Notifications</span>
                                                    </label>
                                                    <p className="text-xs text-theme-muted mt-1 ml-6">
                                                        Automatic notifications for data security incidents
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ThemedCard>

                            <ThemedCard>
                                <div className="p-4 border-b border-theme">
                                    <h3 className="text-lg font-medium text-theme-primary">Data Retention Periods</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Customer Data (Days)
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={2555} // 7 years
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Marketing Data (Days)
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={1095} // 3 years
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Transaction Data (Days)
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={3650} // 10 years
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Log Data (Days)
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={365} // 1 year
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                </div>
                            </ThemedCard>

                            <ThemedCard>
                                <div className="p-4 border-b border-theme">
                                    <h3 className="text-lg font-medium text-theme-primary">Consent Management</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.consent_management}
                                                onChange={(e) => setData('consent_management', e.target.checked)}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">Enable Consent Management</span>
                                        </label>
                                        <p className="text-xs text-theme-muted mt-1 ml-6">
                                            Track and manage user consent for data processing
                                        </p>
                                    </div>
                                    
                                    {data.consent_management && (
                                        <div className="space-y-4 ml-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Consent Categories</h4>
                                                <div className="space-y-3">
                                                    {[
                                                        { name: 'Essential', description: 'Required for basic functionality', required: true },
                                                        { name: 'Analytics', description: 'Usage analytics and performance monitoring', required: false },
                                                        { name: 'Marketing', description: 'Email marketing and promotional communications', required: false },
                                                        { name: 'Personalization', description: 'Personalized content and recommendations', required: false },
                                                        { name: 'Third-party', description: 'Sharing data with third-party services', required: false }
                                                    ].map((category) => (
                                                        <div key={category.name} className="flex items-start space-x-3 p-3 border rounded">
                                                            <input 
                                                                type="checkbox" 
                                                                defaultChecked={category.required}
                                                                disabled={category.required}
                                                                className="rounded border-gray-300 mt-1" 
                                                            />
                                                            <div className="flex-1">
                                                                <div className="flex items-center space-x-2">
                                                                    <span className="text-sm font-medium">{category.name}</span>
                                                                    {category.required && (
                                                                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-theme-muted">{category.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Consent Options</h4>
                                                <div className="space-y-2">
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Require explicit consent for non-essential cookies</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Allow users to withdraw consent</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Granular consent controls</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Log consent history</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </ThemedCard>

                            <ThemedCard>
                                <div className="p-4 border-b border-theme">
                                    <h3 className="text-lg font-medium text-theme-primary">Cookie Banner Configuration</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Banner Message
                                        </label>
                                        <textarea
                                            rows={3}
                                            defaultValue="We use cookies to enhance your experience and analyze site usage. By continuing to browse, you consent to our use of cookies."
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Accept Button Text
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="Accept All"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Reject Button Text
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue="Reject All"
                                                className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </ThemedCard>
                        </div>
                    )}

                    {/* Data Access Controls */}
                    {activeTab === 'access' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Data Access Approvals</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={data.data_access_approvals}
                                                onChange={(e) => setData('data_access_approvals', e.target.checked)}
                                                className="rounded border-gray-300"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">Require Approval for Data Access</span>
                                        </label>
                                        <p className="text-xs text-theme-muted mt-1 ml-6">
                                            Require manager approval for accessing sensitive customer data
                                        </p>
                                    </div>
                                    
                                    {data.data_access_approvals && (
                                        <div className="space-y-4 ml-6">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Approval Requirements</h4>
                                                <div className="space-y-3">
                                                    {[
                                                        'Personal Identification Information (PII)',
                                                        'Financial Information',
                                                        'Health Information',
                                                        'Communication Records',
                                                        'Location Data',
                                                        'Behavioral Data'
                                                    ].map((dataType) => (
                                                        <div key={dataType} className="flex items-center justify-between p-3 border rounded">
                                                            <span className="text-sm">{dataType}</span>
                                                            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                                                                <option>No Approval Required</option>
                                                                <option>Manager Approval</option>
                                                                <option>Admin Approval</option>
                                                                <option>Dual Approval</option>
                                                            </select>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-700 mb-3">Access Logging</h4>
                                                <div className="space-y-2">
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Log all data access attempts</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Record access purpose and justification</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input type="checkbox" className="rounded border-gray-300" />
                                                        <span className="ml-2 text-sm text-gray-700">Notify data subjects of access</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ThemedCard>
                    )}

                    {/* Legal Policies */}
                    {activeTab === 'policies' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Legal Policy Links</h3>
                            </div>
                            <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Privacy Policy URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.privacy_policy_url}
                                        onChange={(e) => setData('privacy_policy_url', e.target.value)}
                                        placeholder="https://yourcompany.com/privacy-policy"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Terms of Service URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.terms_of_service_url}
                                        onChange={(e) => setData('terms_of_service_url', e.target.value)}
                                        placeholder="https://yourcompany.com/terms-of-service"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cookie Policy URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.cookie_policy_url}
                                        onChange={(e) => setData('cookie_policy_url', e.target.value)}
                                        placeholder="https://yourcompany.com/cookie-policy"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                                
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">Policy Display Options</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Show policy links in footer</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Require policy acceptance during registration</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300" />
                                            <span className="ml-2 text-sm text-gray-700">Notify users of policy updates</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </ThemedCard>
                    )}

                    {/* Legal Disclaimers */}
                    {activeTab === 'disclaimers' && (
                        <ThemedCard>
                            <div className="p-4 border-b border-theme">
                                <h3 className="text-lg font-medium text-theme-primary">Legal Disclaimers</h3>
                            </div>
                            <div className="p-6">
                            <div className="space-y-4">
                                <div className="space-y-3">
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Financial Advice Disclaimer</span>
                                            <button type="button" className="text-red-600 text-sm">Remove</button>
                                        </div>
                                        <textarea
                                            rows={3}
                                            defaultValue="The information provided is for educational purposes only and should not be considered as financial advice. Please consult with a qualified financial advisor before making investment decisions."
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        />
                                        <div className="mt-2 flex items-center space-x-4">
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                <span className="ml-1 text-xs text-gray-600">Show on reports</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span className="ml-1 text-xs text-gray-600">Show on emails</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span className="ml-1 text-xs text-gray-600">Show on dashboard</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Data Accuracy Disclaimer</span>
                                            <button type="button" className="text-red-600 text-sm">Remove</button>
                                        </div>
                                        <textarea
                                            rows={3}
                                            defaultValue="While we strive to maintain accurate and up-to-date information, we cannot guarantee the completeness or accuracy of all data presented. Users should verify information independently."
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        />
                                        <div className="mt-2 flex items-center space-x-4">
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                <span className="ml-1 text-xs text-gray-600">Show on reports</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                                                <span className="ml-1 text-xs text-gray-600">Show on emails</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span className="ml-1 text-xs text-gray-600">Show on dashboard</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                                <button type="button" className="text-blue-600 text-sm">+ Add Legal Disclaimer</button>
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
                            {processing ? 'Saving...' : 'Save Compliance Settings'}
                        </ThemedButton>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
