import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Finance CRM - Complete Financial Management Solution" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <h1 className="text-2xl font-bold text-blue-600">Finance CRM</h1>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="text-gray-700 hover:text-blue-600">
                                            Login
                                        </Link>
                                        <Link href={route('register')} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Complete Financial <span className="text-blue-600">CRM Solution</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Streamline your financial operations with our comprehensive CRM platform. Manage clients, portfolios, campaigns, and more in one powerful system.
                        </p>
                        <div className="flex justify-center space-x-4">
                            {!auth.user && (
                                <>
                                    <Link href={route('register')} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
                                        Start Free Trial
                                    </Link>
                                    <Link href={route('login')} className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50">
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Powerful Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            
                            {/* Client Management */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Client Management</h3>
                                <p className="text-gray-600">Comprehensive client profiles with contact information, company details, and relationship tracking.</p>
                            </div>

                            {/* Portfolio Management */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Portfolio Management</h3>
                                <p className="text-gray-600">Track investments across stocks, bonds, mutual funds, ETFs, forex, and crypto with real-time valuations.</p>
                            </div>

                            {/* Campaign Management */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Marketing Campaigns</h3>
                                <p className="text-gray-600">Create and manage email, SMS, and WhatsApp campaigns with automated scheduling and tracking.</p>
                            </div>

                            {/* Lead Management */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Lead Management</h3>
                                <p className="text-gray-600">Track prospects from initial contact to conversion with automated follow-ups and status tracking.</p>
                            </div>

                            {/* Transaction Management */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Transaction Processing</h3>
                                <p className="text-gray-600">Handle deposits, withdrawals, buy/sell orders, dividends, and transfers with complete audit trails.</p>
                            </div>

                            {/* Payroll Management */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Payroll Management</h3>
                                <p className="text-gray-600">Complete payroll processing with salary structures, deductions, taxes, and automated payslip generation.</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Investment Products */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Investment Products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">📈</div>
                                <h4 className="font-semibold">Stocks</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">🏦</div>
                                <h4 className="font-semibold">Mutual Funds</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">📊</div>
                                <h4 className="font-semibold">ETFs</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">🏛️</div>
                                <h4 className="font-semibold">Bonds</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">💱</div>
                                <h4 className="font-semibold">Forex</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">🥇</div>
                                <h4 className="font-semibold">Commodities</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">₿</div>
                                <h4 className="font-semibold">Crypto</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">📋</div>
                                <h4 className="font-semibold">Derivatives</h4>
                            </div>
                            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                                <div className="text-2xl mb-2">💰</div>
                                <h4 className="font-semibold">Margin</h4>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-blue-600">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to Transform Your Financial Operations?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of financial professionals who trust our platform for their CRM needs.
                        </p>
                        {!auth.user && (
                            <Link href={route('register')} className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100">
                                Get Started Today
                            </Link>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p>&copy; 2024 Finance CRM. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
