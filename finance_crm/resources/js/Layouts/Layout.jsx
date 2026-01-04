import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTheme } from '@/Components/ThemeProvider';

const Layout = ({ children }) => {
    const { url } = usePage();
    const { branding } = useTheme();

    const coreModules = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'User', path: '/user' },
        { name: 'Role', path: '/role' },
        { name: 'Address', path: '/address' },
        { name: 'Documents', path: '/documents' },
        { name: 'Client', path: '/client' },
        { name: 'Attendance', path: '/attendance' },
        { name: 'Leads', path: '/leads' },
        { name: 'Target', path: '/target' },
        { name: 'Notes', path: '/notes' },
        { name: 'Tasks', path: '/tasks' },
        { name: 'Complain', path: '/complain' },
        { name: 'Email', path: '/email' },
        { name: 'Email Template', path: '/emailtemplate' },
        { name: 'Campaigns', path: '/campaigns' },
        { name: 'Survey', path: '/survey' },
        { name: 'Payroll', path: '/payroll' },
        { name: 'Meetings', path: '/meetings' },
        { name: 'Calendar', path: '/calendar' },
    ];

    const financeModules = [
        { name: 'Product', path: '/product' },
        { name: 'Accounts', path: '/accounts' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Security Position', path: '/position' },
        { name: 'Transaction', path: '/transaction' },
        { name: 'Reports', path: '/reports' },
    ];

    const systemModules = [
        { name: 'Settings', path: '/settings' },
    ];

    const allModules = [...coreModules, ...financeModules, ...systemModules];

    return (
        <div className="flex h-screen bg-theme-secondary">
            {/* Sidebar */}
            <div className="w-64 bg-theme-primary shadow-lg flex flex-col h-screen">
                <div className="p-4 border-b border-theme flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        {branding?.logo_url && (
                            <img 
                                src={branding.logo_url} 
                                alt={branding.company_name || 'Logo'}
                                className="h-8 w-8"
                            />
                        )}
                        <h1 className="text-xl font-bold text-theme-primary">
                            {branding?.company_name || 'Finance CRM'}
                        </h1>
                    </div>
                </div>
                <nav className="flex-1 overflow-y-auto my-2">
                    <div className="px-4 space-y-1">
                        {/* Core Modules */}
                        <div>
                            <h3 className="px-3 text-xs font-semibold text-theme-muted uppercase tracking-wider mb-2">
                                Core Modules
                            </h3>
                            {coreModules.map((module) => (
                                <Link
                                    key={module.path}
                                    href={module.path}
                                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        url === module.path
                                            ? 'bg-primary text-white'
                                            : 'text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary'
                                    }`}
                                >
                                    {module.name}
                                </Link>
                            ))}
                        </div>
                        
                        {/* Finance Modules */}
                        <div className="pt-4">
                            <h3 className="px-3 text-xs font-semibold text-theme-muted uppercase tracking-wider mb-2">
                                Finance Modules
                            </h3>
                            {financeModules.map((module) => (
                                <Link
                                    key={module.path}
                                    href={module.path}
                                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        url === module.path
                                            ? 'bg-secondary text-white'
                                            : 'text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary'
                                    }`}
                                >
                                    {module.name}
                                </Link>
                            ))}
                        </div>
                        
                        {/* System Modules */}
                        <div className="pt-4">
                            <h3 className="px-3 text-xs font-semibold text-theme-muted uppercase tracking-wider mb-2">
                                System
                            </h3>
                            {systemModules.map((module) => (
                                <Link
                                    key={module.path}
                                    href={module.path}
                                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        url.startsWith(module.path)
                                            ? 'bg-accent text-white'
                                            : 'text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary'
                                    }`}
                                >
                                    {module.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-theme-primary shadow-sm border-b border-theme px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-theme-primary">
                            {allModules.find(m => m.path === url)?.name || 'Dashboard'}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/profile"
                                className="text-theme-secondary hover:text-theme-primary"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                className="text-theme-secondary hover:text-theme-primary"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="bg-theme-primary rounded-lg shadow p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
