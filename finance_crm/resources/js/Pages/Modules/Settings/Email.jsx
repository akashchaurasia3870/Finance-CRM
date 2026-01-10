import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function EmailSettings({ settings = {} }) {
    const [formData, setFormData] = useState({
        smtp_host: settings?.smtp_host || '',
        smtp_port: settings?.smtp_port || 587,
        smtp_username: settings?.smtp_username || '',
        smtp_password: settings?.smtp_password || '',
        smtp_encryption: settings?.smtp_encryption || 'tls',
        from_email: settings?.from_email || '',
        from_name: settings?.from_name || '',
        reply_to_email: settings?.reply_to_email || '',
        email_tracking: settings?.email_tracking || false
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put('/settings/email', formData, {
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
                        <h1 className="text-2xl font-bold text-theme-primary">Email Settings</h1>
                        <p className="text-theme-secondary">Configure SMTP server and email preferences</p>
                    </div>
                    <Link href="/settings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Email Configuration</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">SMTP Host</label>
                                    <ThemedInput
                                        type="text"
                                        value={formData.smtp_host}
                                        onChange={(e) => setFormData({...formData, smtp_host: e.target.value})}
                                        placeholder="smtp.gmail.com"
                                        required
                                    />
                                    {errors.smtp_host && <p className="text-red-500 text-sm mt-1">{errors.smtp_host}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">SMTP Port</label>
                                    <ThemedInput
                                        type="number"
                                        value={formData.smtp_port}
                                        onChange={(e) => setFormData({...formData, smtp_port: parseInt(e.target.value)})}
                                        required
                                    />
                                    {errors.smtp_port && <p className="text-red-500 text-sm mt-1">{errors.smtp_port}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">SMTP Username</label>
                                    <ThemedInput
                                        type="text"
                                        value={formData.smtp_username}
                                        onChange={(e) => setFormData({...formData, smtp_username: e.target.value})}
                                        required
                                    />
                                    {errors.smtp_username && <p className="text-red-500 text-sm mt-1">{errors.smtp_username}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">SMTP Password</label>
                                    <ThemedInput
                                        type="password"
                                        value={formData.smtp_password}
                                        onChange={(e) => setFormData({...formData, smtp_password: e.target.value})}
                                        required
                                    />
                                    {errors.smtp_password && <p className="text-red-500 text-sm mt-1">{errors.smtp_password}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Encryption</label>
                                <select
                                    value={formData.smtp_encryption}
                                    onChange={(e) => setFormData({...formData, smtp_encryption: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary"
                                >
                                    <option value="tls">TLS</option>
                                    <option value="ssl">SSL</option>
                                    <option value="">None</option>
                                </select>
                                {errors.smtp_encryption && <p className="text-red-500 text-sm mt-1">{errors.smtp_encryption}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">From Email</label>
                                    <ThemedInput
                                        type="email"
                                        value={formData.from_email}
                                        onChange={(e) => setFormData({...formData, from_email: e.target.value})}
                                        required
                                    />
                                    {errors.from_email && <p className="text-red-500 text-sm mt-1">{errors.from_email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">From Name</label>
                                    <ThemedInput
                                        type="text"
                                        value={formData.from_name}
                                        onChange={(e) => setFormData({...formData, from_name: e.target.value})}
                                        required
                                    />
                                    {errors.from_name && <p className="text-red-500 text-sm mt-1">{errors.from_name}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Reply-To Email</label>
                                <ThemedInput
                                    type="email"
                                    value={formData.reply_to_email}
                                    onChange={(e) => setFormData({...formData, reply_to_email: e.target.value})}
                                />
                                {errors.reply_to_email && <p className="text-red-500 text-sm mt-1">{errors.reply_to_email}</p>}
                            </div>

                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.email_tracking}
                                        onChange={(e) => setFormData({...formData, email_tracking: e.target.checked})}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium text-theme-primary">Enable Email Tracking</span>
                                </label>
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
                                    {processing ? 'Saving...' : 'Save Email Settings'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
