import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

export default function EditClient({ client }) {
    const [data, setData] = useState({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        company: client.company || '',
        address: client.address || '',
        status: client.status === 'active',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        const submitData = {
            ...data,
            status: data.status ? 'active' : 'inactive'
        };
        
        const formData = new FormData();
        formData.append('_method', 'PUT');
        
        Object.keys(submitData).forEach(key => {
            if (submitData[key] !== null && submitData[key] !== '') {
                formData.append(key, submitData[key]);
            }
        });
        
        router.post(`/client/${client.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                router.visit('/client');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Client</h1>
                        <p className="text-theme-secondary">Update client information</p>
                    </div>
                    <Link href="/client">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Client Information</h3>
                    </div>
                    <div className="p-6">
                        {errors.error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errors.error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
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
                                        Phone
                                    </label>
                                    <ThemedInput
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData({...data, phone: e.target.value})}
                                    />
                                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Company
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.company}
                                        onChange={(e) => setData({...data, company: e.target.value})}
                                    />
                                    {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Address
                                </label>
                                <ThemedTextarea
                                    value={data.address}
                                    onChange={(e) => setData({...data, address: e.target.value})}
                                    rows="3"
                                />
                                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="status"
                                        checked={data.status}
                                        onChange={(e) => setData({...data, status: e.target.checked})}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="status" className="ml-2 block text-sm font-medium text-theme-primary">
                                        Active Status
                                    </label>
                                </div>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/client">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Client'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
