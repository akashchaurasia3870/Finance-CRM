import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function EditDocument({ document, users = [] }) {
    const [data, setData] = useState({
        name: document.name || '',
        file: null,
        owned_by: document.owned_by || '',
        description: document.description || '',
        is_active: document.is_active ?? true,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({
                ...data, 
                file: file,
                name: data.name || file.name
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        console.log('Form data before submission:', data);
        
        const formData = new FormData();
        
        // Add method spoofing for Laravel
        formData.append('_method', 'PUT');
        
        // Always include required fields
        formData.append('name', data.name || '');
        formData.append('is_active', data.is_active ? '1' : '0');
        
        // Include optional fields if they have values
        if (data.owned_by) formData.append('owned_by', data.owned_by);
        if (data.description) formData.append('description', data.description);
        if (data.file) formData.append('file', data.file);
        
        // Debug FormData
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        router.post(`/documents/${document.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                router.visit('/documents');
            },
            onError: (errors) => {
                console.log('Update errors:', errors);
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Document</h1>
                        <p className="text-theme-secondary">Update document information</p>
                    </div>
                    <Link href="/documents">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Document Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Replace File (Optional)
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                />
                                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                                <p className="text-sm text-theme-muted mt-1">
                                    Leave empty to keep current file. Uploading a new file will replace the existing one.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Document Name *
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
                                    Owner
                                </label>
                                <select
                                    value={data.owned_by}
                                    onChange={(e) => setData({...data, owned_by: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                >
                                    <option value="">Select Owner (Optional)</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                                {errors.owned_by && <p className="text-red-500 text-sm mt-1">{errors.owned_by}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    rows="3"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
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
                                <Link href="/documents">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
