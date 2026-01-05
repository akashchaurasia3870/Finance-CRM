import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

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

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put('/settings/security', formData, {
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
                        <h1 className="text-2xl font-bold text-theme-primary">Security Settings</h1>
                        <p className="text-theme-secondary">Configure security policies and access controls</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Security Configuration</h3>
                    </div>
                    <div className="p-6">
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
                                        <span className="text-sm font-medium text-theme-primary">Enable Two-Factor Authentication</span>
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
                                        <span className="text-sm font-medium text-theme-primary">Force Password Change on First Login</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">Login Attempt Limit</label>
                                    <ThemedInput
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={formData.login_attempt_limit}
                                        onChange={(e) => setFormData({...formData, login_attempt_limit: parseInt(e.target.value)})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">Session Timeout (minutes)</label>
                                    <ThemedInput
                                        type="number"
                                        min="5"
                                        max="1440"
                                        value={formData.session_timeout}
                                        onChange={(e) => setFormData({...formData, session_timeout: parseInt(e.target.value)})}
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium text-theme-primary mb-4">Password Policy</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-theme-primary mb-2">Minimum Length</label>
                                        <ThemedInput
                                            type="number"
                                            min="6"
                                            max="32"
                                            value={formData.password_policy.min_length}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                password_policy: {...formData.password_policy, min_length: parseInt(e.target.value)}
                                            })}
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
                                            <span className="text-sm text-theme-primary">Require Uppercase</span>
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
                                            <span className="text-sm text-theme-primary">Require Lowercase</span>
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
                                            <span className="text-sm text-theme-primary">Require Numbers</span>
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
                                            <span className="text-sm text-theme-primary">Require Special Characters</span>
                                        </label>
                                    </div>
                                </div>
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
                                    {processing ? 'Saving...' : 'Save Security Settings'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
