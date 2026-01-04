import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function NotificationSettings({ settings = {} }) {
    const [formData, setFormData] = useState({
        email_notifications: settings.email_notifications || true,
        sms_notifications: settings.sms_notifications || false,
        push_notifications: settings.push_notifications || true,
        notification_triggers: settings.notification_triggers || {
            lead_created: true,
            lead_updated: true,
            task_assigned: true,
            task_completed: true,
            meeting_scheduled: true,
            campaign_launched: true,
            user_login: false,
            password_changed: true
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put('/settings/notifications', formData, {
            onSuccess: () => {
                router.visit('/settings');
            }
        });
    };

    const handleTriggerChange = (trigger, enabled) => {
        setFormData(prev => ({
            ...prev,
            notification_triggers: {
                ...prev.notification_triggers,
                [trigger]: enabled
            }
        }));
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
                        <p className="text-gray-600">Configure system-wide notification preferences</p>
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
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
                            <div className="space-y-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.email_notifications}
                                        onChange={(e) => setFormData({...formData, email_notifications: e.target.checked})}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                                        <p className="text-xs text-gray-500">Send notifications via email</p>
                                    </div>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.sms_notifications}
                                        onChange={(e) => setFormData({...formData, sms_notifications: e.target.checked})}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">SMS Notifications</span>
                                        <p className="text-xs text-gray-500">Send notifications via SMS</p>
                                    </div>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.push_notifications}
                                        onChange={(e) => setFormData({...formData, push_notifications: e.target.checked})}
                                        className="mr-3"
                                    />
                                    <div>
                                        <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                                        <p className="text-xs text-gray-500">Send browser push notifications</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Triggers</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(formData.notification_triggers).map(([trigger, enabled]) => (
                                    <label key={trigger} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={enabled}
                                            onChange={(e) => handleTriggerChange(trigger, e.target.checked)}
                                            className="mr-3"
                                        />
                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                            {trigger.replace(/_/g, ' ')}
                                        </span>
                                    </label>
                                ))}
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
                                Save Notification Settings
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}