import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

export default function EditTarget({ target, users = [] }) {
    const [data, setData] = useState({
        name: target.name || '',
        description: target.description || '',
        target_value: target.target_value || '',
        achieved_value: target.achieved_value || '0',
        start_date: target.start_date || '',
        end_date: target.end_date || '',
        assigned_to: target.assigned_to || '',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        const formData = new FormData();
        formData.append('_method', 'PUT');
        
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== '') {
                formData.append(key, data[key]);
            }
        });
        
        router.post(`/target/${target.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                router.visit('/target');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Target</h1>
                        <p className="text-theme-secondary">Update target information</p>
                    </div>
                    <Link href="/target">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Target Information</h3>
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
                                        Assigned To
                                    </label>
                                    <select
                                        value={data.assigned_to}
                                        onChange={(e) => setData({...data, assigned_to: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    >
                                        <option value="">Select User</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                    {errors.assigned_to && <p className="text-red-500 text-sm mt-1">{errors.assigned_to}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Target Value *
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.target_value}
                                        onChange={(e) => setData({...data, target_value: e.target.value})}
                                        placeholder="0.00"
                                        required
                                    />
                                    {errors.target_value && <p className="text-red-500 text-sm mt-1">{errors.target_value}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Achieved Value
                                    </label>
                                    <ThemedInput
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.achieved_value}
                                        onChange={(e) => setData({...data, achieved_value: e.target.value})}
                                        placeholder="0.00"
                                    />
                                    {errors.achieved_value && <p className="text-red-500 text-sm mt-1">{errors.achieved_value}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Start Date *
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData({...data, start_date: e.target.value})}
                                        required
                                    />
                                    {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        End Date *
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData({...data, end_date: e.target.value})}
                                        required
                                    />
                                    {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description
                                </label>
                                <ThemedTextarea
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                    rows="3"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/target">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Target'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
