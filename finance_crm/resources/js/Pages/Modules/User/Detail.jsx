import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function UserDetail({ user }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/user/${user.id}`, {
                onSuccess: () => {
                    router.visit('/user');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
                        <p className="text-gray-600">View user information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/user"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/user/${user.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Basic Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email</label>
                                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    user.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {user.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Email Verified</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    user.email_verified_at 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {user.email_verified_at ? 'Verified' : 'Not Verified'}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(user.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(user.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {user.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.creator.name}</p>
                                </div>
                            )}
                            {user.email_verified_at && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Email Verified At</label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(user.email_verified_at).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {user.roles && user.roles.length > 0 && (
                    <div className="bg-white border rounded-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-medium">Assigned Roles</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {user.roles.map((role) => (
                                    <div key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <div>
                                            <p className="font-medium text-gray-900">{role.name}</p>
                                            <p className="text-sm text-gray-500">{role.description}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            role.pivot.is_active 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {role.pivot.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {user.addresses && user.addresses.length > 0 && (
                    <div className="bg-white border rounded-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-medium">Addresses</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {user.addresses.map((address) => (
                                    <div key={address.id} className="p-4 bg-gray-50 rounded-md">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                {address.type}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-900">
                                            <p>{address.address_line_1}</p>
                                            {address.address_line_2 && <p>{address.address_line_2}</p>}
                                            <p>
                                                {address.city}
                                                {address.state && `, ${address.state}`}
                                                {address.postal_code && ` - ${address.postal_code}`}
                                            </p>
                                            <p>{address.country}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}