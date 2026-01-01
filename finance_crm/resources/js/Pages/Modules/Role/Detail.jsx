import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function RoleDetail({ role }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(`/role/${role.id}`, {
                onSuccess: () => {
                    router.visit('/role');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Role Details</h1>
                        <p className="text-gray-600">View role information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/role"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/role/${role.id}/edit`}
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
                                <p className="mt-1 text-sm text-gray-900">{role.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${
                                    role.is_active 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {role.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-500">Description</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {role.description || 'No description provided'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(role.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(role.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {role.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{role.creator.name}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Permissions</h3>
                    </div>
                    <div className="p-6">
                        {role.permissions && Array.isArray(role.permissions) && role.permissions.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {role.permissions.map((permission, index) => (
                                    <div key={index} className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <span className="text-sm text-gray-700">{permission}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No permissions assigned to this role.</p>
                        )}
                    </div>
                </div>

                {role.users && role.users.length > 0 && (
                    <div className="bg-white border rounded-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-medium">Users with this Role</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-2">
                                {role.users.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            user.pivot.is_active 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user.pivot.is_active ? 'Active' : 'Inactive'}
                                        </span>
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