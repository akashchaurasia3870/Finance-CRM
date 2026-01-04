import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';
import { ThemedCard } from '@/Components/ThemedComponents';

export default function SettingsIndex() {
    const settingsCategories = [
        { name: 'Organization', href: '/settings/organization', icon: '🏢', description: 'Company profile, timezone, business hours' },
        { name: 'Users', href: '/settings/users', icon: '👥', description: 'User management and access control' },
        { name: 'Roles', href: '/settings/roles', icon: '🔐', description: 'Role and permission management' },
        { name: 'Security', href: '/settings/security', icon: '🛡️', description: '2FA, login limits, IP restrictions' },
        { name: 'Notifications', href: '/settings/notifications', icon: '🔔', description: 'Email, SMS, push notifications' },
        { name: 'Email', href: '/settings/email', icon: '📧', description: 'SMTP configuration and templates' },
        { name: 'Integrations', href: '/settings/integrations', icon: '🔗', description: 'Third-party integrations and APIs' },
        { name: 'Data Management', href: '/settings/data-management', icon: '💾', description: 'Import, export, retention policies' },
        { name: 'Audit', href: '/settings/audit', icon: '📊', description: 'Activity logging and system monitoring' },
        { name: 'Localization', href: '/settings/localization', icon: '🌍', description: 'Language, currency, date formats' },
        { name: 'Branding', href: '/settings/branding', icon: '🎨', description: 'Colors, fonts, UI customization' },
        { name: 'System Behavior', href: '/settings/system-behavior', icon: '⚙️', description: 'Landing pages, ownership rules' },
        { name: 'Compliance', href: '/settings/compliance', icon: '📋', description: 'GDPR, consent management, policies' }
    ];

    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-theme-primary">Settings</h1>
                    <p className="text-theme-secondary">Manage system configuration and preferences</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settingsCategories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="block"
                        >
                            <ThemedCard className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex items-start space-x-4">
                                    <div className="text-2xl">{category.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-theme-primary">{category.name}</h3>
                                        <p className="text-sm text-theme-muted mt-1">{category.description}</p>
                                    </div>
                                </div>
                            </ThemedCard>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
}