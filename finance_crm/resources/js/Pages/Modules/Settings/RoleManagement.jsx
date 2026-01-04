import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { router } from '@inertiajs/react';

export default function RoleManagement({ roles = [], permissions = {} }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        permissions: {}
    });

    const handleCreateRole = (e) => {
        e.preventDefault();
        router.post('/settings/roles', formData, {
            onSuccess: () => {
                setShowCreateForm(false);
                setFormData({ name: '', description: '', permissions: {} });
            }
        });
    };

    const handlePermissionChange = (module, action, checked) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [module]: {
                    ...prev.permissions[module],
                    [action]: checked
                }
            }
        }));
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
                        <p className="text-gray-600">Manage roles and permissions</p>
                    </div>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Create Role
                    </button>
                </div>

                {showCreateForm && (
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Create New Role</h3>
                        <form onSubmit={handleCreateRole} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <input
                                        type="text"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-md font-medium text-gray-900 mb-3">Permissions</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.entries(permissions).map(([module, actions]) => (
                                        <div key={module} className="border rounded-lg p-4">
                                            <h5 className="font-medium text-gray-900 mb-2 capitalize">{module}</h5>
                                            <div className="space-y-2">
                                                {actions.map(action => (
                                                    <label key={action} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.permissions[module]?.[action] || false}
                                                            onChange={(e) => handlePermissionChange(module, action, e.target.checked)}
                                                            className="mr-2"
                                                        />
                                                        <span className="text-sm capitalize">{action}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Create Role
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="bg-white border rounded-lg">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-medium">Existing Roles</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Users</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {roles.map((role) => (
                                    <tr key={role.id}>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">{role.name}</td>
                                        <td className="px-6 py-4 text-gray-500">{role.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {role.users_count || 0} users
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                role.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {role.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}