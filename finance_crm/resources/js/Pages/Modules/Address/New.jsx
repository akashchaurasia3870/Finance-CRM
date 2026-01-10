import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function NewAddress({ users = [] }) {
    const [data, setData] = useState({
        user_id: '',
        type: 'current',
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        country: 'India',
        postal_code: '',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const addressTypes = [
        { value: 'current', label: 'Current' },
        { value: 'permanent', label: 'Permanent' },
        { value: 'office', label: 'Office' },
        { value: 'billing', label: 'Billing' },
        { value: 'shipping', label: 'Shipping' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/address', data, {
            onSuccess: () => {
                router.visit('/address');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Create Address</h1>
                        <p className="text-theme-secondary">Add a new address to the system</p>
                    </div>
                    <Link href="/address">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Address Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        User
                                    </label>
                                    <select
                                        value={data.user_id}
                                        onChange={(e) => setData({...data, user_id: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    >
                                        <option value="">Select User (Optional)</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name} ({user.email})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Type *
                                    </label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData({...data, type: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                        required
                                    >
                                        {addressTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Address Line 1 *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.address_line_1}
                                    onChange={(e) => setData({...data, address_line_1: e.target.value})}
                                    required
                                />
                                {errors.address_line_1 && <p className="text-red-500 text-sm mt-1">{errors.address_line_1}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Address Line 2
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.address_line_2}
                                    onChange={(e) => setData({...data, address_line_2: e.target.value})}
                                />
                                {errors.address_line_2 && <p className="text-red-500 text-sm mt-1">{errors.address_line_2}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        City *
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData({...data, city: e.target.value})}
                                        required
                                    />
                                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        State
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.state}
                                        onChange={(e) => setData({...data, state: e.target.value})}
                                    />
                                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Postal Code
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) => setData({...data, postal_code: e.target.value})}
                                    />
                                    {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Country
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.country}
                                    onChange={(e) => setData({...data, country: e.target.value})}
                                />
                                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/address">
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
