import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function EmailSettings({ settings = {} }) {
    const [formData, setFormData] = useState({
        smtp_host: settings.smtp_host || '',
        smtp_port: settings.smtp_port || 587,
        smtp_username: settings.smtp_username || '',
        smtp_password: settings.smtp_password || '',
        smtp_encryption: settings.smtp_encryption || 'tls',
        from_email: settings.from_email || '',
        from_name: settings.from_name || '',
        reply_to_email: settings.reply_to_email || '',
        email_tracking: settings.email_tracking || false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put('/settings/email', formData, {
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
                        <h1 className="text-2xl font-bold text-gray-900">Email Settings</h1>
                        <p className="text-gray-600">Configure SMTP server and email preferences</p>
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
                                <label className="block text-sm font-medium text-gray-700">SMTP Host</label>
                                <input
                                    type="text"
                                    value={formData.smtp_host}
                                    onChange={(e) => setFormData({...formData, smtp_host: e.target.value})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    placeholder="smtp.gmail.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">SMTP Port</label>
                                <input
                                    type="number"
                                    value={formData.smtp_port}
                                    onChange={(e) => setFormData({...formData, smtp_port: parseInt(e.target.value)})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">SMTP Username</label>
                                <input
                                    type="text"
                                    value={formData.smtp_username}
                                    onChange={(e) => setFormData({...formData, smtp_username: e.target.value})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">SMTP Password</label>
                                <input
                                    type="password"
                                    value={formData.smtp_password}
                                    onChange={(e) => setFormData({...formData, smtp_password: e.target.value})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Encryption</label>
                            <select
                                value={formData.smtp_encryption}
                                onChange={(e) => setFormData({...formData, smtp_encryption: e.target.value})}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                            >
                                <option value="tls">TLS</option>
                                <option value="ssl">SSL</option>
                                <option value="">None</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">From Email</label>
                                <input
                                    type="email"
                                    value={formData.from_email}
                                    onChange={(e) => setFormData({...formData, from_email: e.target.value})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">From Name</label>
                                <input
                                    type="text"
                                    value={formData.from_name}
                                    onChange={(e) => setFormData({...formData, from_name: e.target.value})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Reply-To Email</label>
                            <input
                                type="email"
                                value={formData.reply_to_email}
                                onChange={(e) => setFormData({...formData, reply_to_email: e.target.value})}
                                className="mt-1 block w-full border rounded-md px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.email_tracking}
                                    onChange={(e) => setFormData({...formData, email_tracking: e.target.checked})}
                                    className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Enable Email Tracking</span>
                            </label>
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
                                Save Email Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}