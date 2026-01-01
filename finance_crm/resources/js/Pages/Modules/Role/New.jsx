import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function NewRole() {
    const [data, setData] = useState({
        name: '',
        description: '',
        permissions: [],
        is_active: true,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const availablePermissions = [
        'users.create', 'users.read', 'users.update', 'users.delete',
        'roles.create', 'roles.read', 'roles.update', 'roles.delete',
        'clients.create', 'clients.read', 'clients.update', 'clients.delete',
        'leads.create', 'leads.read', 'leads.update', 'leads.delete',
        'tasks.create', 'tasks.read', 'tasks.update', 'tasks.delete',
        'campaigns.create', 'campaigns.read', 'campaigns.update', 'campaigns.delete',
        'reports.read', 'reports.generate',
    ];

    const handlePermissionChange = (permission) => {
        const newPermissions = data.permissions.includes(permission)
            ? data.permissions.filter(p => p !== permission)
            : [...data.permissions, permission];
        setData({...data, permissions: newPermissions});
    };

    const handleSelectAll = (checked) => {
        setData({...data, permissions: checked ? [...availablePermissions] : []});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/role', data, {
            onSuccess: () => {
                router.visit('/role');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Create Role</h1>
                        <p className="text-gray-600">Add a new role to the system</p>
                    </div>
                    <Link
                        href="/role"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData({...data, name: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Permissions
                            </label>
                            <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                                <div className="flex items-center mb-3 pb-2 border-b">
                                    <input
                                        type="checkbox"
                                        id="select-all"
                                        checked={data.permissions.length === availablePermissions.length}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="select-all" className="text-sm font-medium text-gray-700">
                                        Select All
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {availablePermissions.map((permission) => (
                                        <div key={permission} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={permission}
                                                checked={data.permissions.includes(permission)}
                                                onChange={() => handlePermissionChange(permission)}
                                                className="mr-2"
                                            />
                                            <label htmlFor={permission} className="text-sm text-gray-700">
                                                {permission}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {errors.permissions && <p className="text-red-500 text-sm mt-1">{errors.permissions}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData({...data, is_active: e.target.checked})}
                                className="mr-2"
                            />
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                Active
                            </label>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/role"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}