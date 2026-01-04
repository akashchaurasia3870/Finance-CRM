import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedBadge } from '@/Components/ThemedComponents';

export default function UserManagement({ users = [], roles = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        is_active: true
    });

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateUser = (e) => {
        e.preventDefault();
        router.post('/settings/users', formData, {
            onSuccess: () => {
                setShowCreateForm(false);
                setFormData({ name: '', email: '', password: '', is_active: true });
            }
        });
    };

    const toggleUserStatus = (userId, currentStatus) => {
        router.put(`/settings/users/${userId}`, { is_active: !currentStatus });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">User Management</h1>
                        <p className="text-theme-secondary">Manage system users and access</p>
                    </div>
                    <ThemedButton
                        onClick={() => setShowCreateForm(true)}
                        variant="primary"
                    >
                        Create User
                    </ThemedButton>
                </div>

                {showCreateForm && (
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Create New User</h3>
                        </div>
                        <div className="p-6">
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="mt-1 block w-full border rounded-md px-3 py-2"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="mt-1 block w-full border rounded-md px-3 py-2"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-3">
                                <ThemedButton
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    variant="secondary"
                                >
                                    Cancel
                                </ThemedButton>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                >
                                    Create User
                                </ThemedButton>
                            </div>
                        </form>
                        </div>
                    </ThemedCard>
                )}

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <ThemedInput
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64"
                        />
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Name</ThemedTableCell>
                                <ThemedTableCell header>Email</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredUsers.map((user) => (
                                <ThemedTableRow key={user.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{user.name}</div>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {user.email}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={user.is_active ? 'success' : 'error'}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedButton
                                            onClick={() => toggleUserStatus(user.id, user.is_active)}
                                            variant="ghost"
                                            className="text-xs px-2 py-1"
                                        >
                                            {user.is_active ? 'Deactivate' : 'Activate'}
                                        </ThemedButton>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                </ThemedCard>
            </div>
        </Layout>
    );
}
