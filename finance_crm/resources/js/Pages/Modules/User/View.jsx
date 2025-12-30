import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';

export default function UserView() {
    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                        <p className="text-gray-600">Manage system users</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/user/edit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add User
                        </Link>
                        <Link
                            href="/user/detail"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
                
                <div className="bg-white border rounded-lg">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-medium">User List</h3>
                    </div>
                    <div className="p-4">
                        <p className="text-gray-500">User management interface will be implemented here.</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}