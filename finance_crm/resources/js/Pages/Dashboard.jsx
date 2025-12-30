import React from 'react';
import Layout from '@/Layouts/Layout';

export default function Dashboard() {
    return (
        <Layout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome to Finance CRM Dashboard</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-900">Total Users</h3>
                        <p className="text-3xl font-bold text-blue-600">1,234</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-900">Active Clients</h3>
                        <p className="text-3xl font-bold text-green-600">856</p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-yellow-900">Pending Tasks</h3>
                        <p className="text-3xl font-bold text-yellow-600">42</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-purple-900">Total Revenue</h3>
                        <p className="text-3xl font-bold text-purple-600">$125K</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}