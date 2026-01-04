import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function NewUser({ roles = [] }) {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        is_active: true,
        roles: [],
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/user', data, {
            onSuccess: () => {
                router.visit('/user');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Create User</h1>
                        <p className="text-theme-secondary">Add a new user to the system</p>
                    </div>
                    <Link href="/user">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">User Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Name *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({...data, name: e.target.value})}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Email *
                                </label>
                                <ThemedInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData({...data, email: e.target.value})}
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Password *
                                </label>
                                <ThemedInput
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData({...data, password: e.target.value})}
                                    required
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Confirm Password *
                                </label>
                                <ThemedInput
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData({...data, password_confirmation: e.target.value})}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Roles
                                </label>
                                <div className="border border-theme rounded-md p-4 max-h-40 overflow-y-auto bg-theme-surface">
                                    {roles.length > 0 ? (
                                        <div className="space-y-2">
                                            {roles.map((role) => (
                                                <div key={role.id} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`role-${role.id}`}
                                                        checked={data.roles.includes(role.id)}
                                                        onChange={(e) => {
                                                            const newRoles = e.target.checked
                                                                ? [...data.roles, role.id]
                                                                : data.roles.filter(r => r !== role.id);
                                                            setData({...data, roles: newRoles});
                                                        }}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={`role-${role.id}`} className="text-sm text-theme-primary">
                                                        {role.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-theme-muted text-sm">No roles available</p>
                                    )}
                                </div>
                                {errors.roles && <p className="text-red-500 text-sm mt-1">{errors.roles}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={(e) => setData({...data, is_active: e.target.checked})}
                                    className="mr-2"
                                />
                                <label htmlFor="is_active" className="text-sm font-medium text-theme-primary">
                                    Active
                                </label>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/user">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}