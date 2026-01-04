import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function OrganizationSettings({ settings = {} }) {
    const [formData, setFormData] = useState({
        company_name: settings.company_name || '',
        timezone: settings.timezone || 'UTC',
        fiscal_year_start: settings.fiscal_year_start || '',
        business_hours: settings.business_hours || {},
        working_days: settings.working_days || [1,2,3,4,5]
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put('/settings/organization', formData, {
            onSuccess: () => {
                router.visit('/settings');
            }
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Organization Settings</h1>
                        <p className="text-gray-600">Configure company profile and business settings</p>
                    </div>
                    <Link
                        href="/settings"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                            <input
                                type="text"
                                value={formData.company_name}
                                onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Timezone</label>
                            <select
                                value={formData.timezone}
                                onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                            >
                                <option value="UTC">UTC</option>
                                <option value="America/New_York">Eastern Time</option>
                                <option value="America/Chicago">Central Time</option>
                                <option value="America/Denver">Mountain Time</option>
                                <option value="America/Los_Angeles">Pacific Time</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fiscal Year Start</label>
                            <input
                                type="date"
                                value={formData.fiscal_year_start}
                                onChange={(e) => setFormData({...formData, fiscal_year_start: e.target.value})}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Link
                                href="/settings"
                                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}