import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function SecuritySettings({ settings = {} }) {
    const [formData, setFormData] = useState({
        two_factor_enabled: settings.two_factor_enabled || false,
        login_attempt_limit: settings.login_attempt_limit || 5,
        session_timeout: settings.session_timeout || 120,
        force_password_change: settings.force_password_change || false,
        password_policy: settings.password_policy || {
            min_length: 8,
            require_uppercase: true,
            require_lowercase: true,
            require_numbers: true,
            require_special: true
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put('/settings/security', formData, {
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
                        <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
                        <p className="text-gray-600">Configure security policies and access controls</p>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.two_factor_enabled}
                                        onChange={(e) => setFormData({...formData, two_factor_enabled: e.target.checked})}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication</span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.force_password_change}
                                        onChange={(e) => setFormData({...formData, force_password_change: e.target.checked})}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Force Password Change on First Login</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Login Attempt Limit</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.login_attempt_limit}
                                    onChange={(e) => setFormData({...formData, login_attempt_limit: parseInt(e.target.value)})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                                <input
                                    type="number"
                                    min="5"
                                    max="1440"
                                    value={formData.session_timeout}
                                    onChange={(e) => setFormData({...formData, session_timeout: parseInt(e.target.value)})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Password Policy</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Minimum Length</label>
                                    <input
                                        type="number"
                                        min="6"
                                        max="32"
                                        value={formData.password_policy.min_length}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            password_policy: {...formData.password_policy, min_length: parseInt(e.target.value)}
                                        })}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.password_policy.require_uppercase}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                password_policy: {...formData.password_policy, require_uppercase: e.target.checked}
                                            })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Require Uppercase</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.password_policy.require_lowercase}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                password_policy: {...formData.password_policy, require_lowercase: e.target.checked}
                                            })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Require Lowercase</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.password_policy.require_numbers}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                password_policy: {...formData.password_policy, require_numbers: e.target.checked}
                                            })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Require Numbers</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={formData.password_policy.require_special}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                password_policy: {...formData.password_policy, require_special: e.target.checked}
                                            })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Require Special Characters</span>
                                    </label>
                                </div>
                            </div>
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
                                Save Security Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}