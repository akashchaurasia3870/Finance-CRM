import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const Layout = ({ children }) => {
    const { url } = usePage();

    const modules = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'User', path: '/user' },
        { name: 'Role', path: '/role' },
        { name: 'Address', path: '/address' },
        { name: 'Accounts', path: '/accounts' },
        { name: 'Attendance', path: '/attendance' },
        { name: 'Calendar', path: '/calendar' },
        { name: 'Campaigns', path: '/campaigns' },
        { name: 'Client', path: '/client' },
        { name: 'Complain', path: '/complain' },
        { name: 'Documents', path: '/documents' },
        { name: 'Email', path: '/email' },
        { name: 'Email Template', path: '/emailtemplate' },
        { name: 'Home', path: '/home' },
        { name: 'Leads', path: '/leads' },
        { name: 'Meetings', path: '/meetings' },
        { name: 'Notes', path: '/notes' },
        { name: 'Payroll', path: '/payroll' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Position', path: '/position' },
        { name: 'Product', path: '/product' },
        { name: 'Reports', path: '/reports' },
        { name: 'Survey', path: '/survey' },
        { name: 'Target', path: '/target' },
        { name: 'Tasks', path: '/tasks' },
    ];

    const productModules = [
        { name: 'Bond', path: '/bond' },
        { name: 'Forex', path: '/forex' },
        { name: 'Loan', path: '/loan' },
        { name: 'Margin', path: '/margin' },
        { name: 'Mutual Funds', path: '/mutualfunds' },
        { name: 'Stock', path: '/stock' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold text-gray-800">Finance CRM</h1>
                </div>
                <nav className="mt-4 h-full overflow-y-auto">
                    <div className="px-4 space-y-1">
                        {modules.map((module) => (
                            <Link
                                key={module.path}
                                href={module.path}
                                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    url === module.path
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                {module.name}
                            </Link>
                        ))}
                        
                        {/* Product Sub-modules */}
                        <div className="pt-4">
                            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Products
                            </h3>
                            <div className="mt-2 space-y-1">
                                {productModules.map((module) => (
                                    <Link
                                        key={module.path}
                                        href={module.path}
                                        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            url === module.path
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                    >
                                        {module.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {modules.find(m => m.path === url)?.name || 
                             productModules.find(m => m.path === url)?.name || 
                             'Dashboard'}
                        </h2>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/profile"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Profile
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                className="text-gray-600 hover:text-gray-900"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;