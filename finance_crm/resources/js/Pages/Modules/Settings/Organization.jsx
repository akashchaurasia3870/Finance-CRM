import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function OrganizationSettings({ settings = {} }) {
    const [formData, setFormData] = useState({
        company_name: settings.company_name || '',
        timezone: settings.timezone || 'UTC',
        fiscal_year_start: settings.fiscal_year_start || '',
        business_hours: settings.business_hours || {},
        working_days: settings.working_days || [1,2,3,4,5]
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put('/settings/organization', formData, {
            onSuccess: () => {
                router.visit('/settings');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Organization Settings</h1>
                        <p className="text-theme-secondary">Configure company profile and business settings</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Company Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Company Name</label>
                                <ThemedInput
                                    type="text"
                                    value={formData.company_name}
                                    onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                                    required
                                />
                                {errors.company_name && <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Timezone</label>
                                <select
                                    value={formData.timezone}
                                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                >
                                    <option value="UTC">UTC</option>
                                    <option value="America/New_York">Eastern Time</option>
                                    <option value="America/Chicago">Central Time</option>
                                    <option value="America/Denver">Mountain Time</option>
                                    <option value="America/Los_Angeles">Pacific Time</option>
                                </select>
                                {errors.timezone && <p className="text-red-500 text-sm mt-1">{errors.timezone}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Fiscal Year Start</label>
                                <ThemedInput
                                    type="date"
                                    value={formData.fiscal_year_start}
                                    onChange={(e) => setFormData({...formData, fiscal_year_start: e.target.value})}
                                    required
                                />
                                {errors.fiscal_year_start && <p className="text-red-500 text-sm mt-1">{errors.fiscal_year_start}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/settings">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
