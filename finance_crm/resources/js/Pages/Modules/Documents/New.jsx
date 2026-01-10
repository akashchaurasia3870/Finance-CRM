import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

export default function NewDocument({ users = [] }) {
    const [data, setData] = useState({
        name: '',
        file: null,
        owned_by: '',
        description: '',
        is_active: true,
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
        setErrors({});
        
        // Debug logging
        console.log('Form data before submission:', data);
        
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null && data[key] !== '') {
                formData.append(key, data[key]);
                console.log(`Added to FormData: ${key} =`, data[key]);
            }
        });
        
        // Log FormData contents
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        
        router.post('/documents', formData, {
            forceFormData: true,
            onSuccess: (page) => {
                console.log('Upload successful:', page);
                router.visit('/documents');
            },
            onError: (errors) => {
                console.log('Upload errors:', errors);
                setErrors(errors);
                setProcessing(false);
            },
            onFinish: () => {
                console.log('Upload finished');
                setProcessing(false);
            }
        });
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Upload Document</h1>
                        <p className="text-theme-secondary">Add a new document to the system</p>
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
                        {errors.error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errors.error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    File *
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    required
                                />
                                {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
                                <p className="text-sm text-theme-muted mt-1">Maximum file size: 10MB</p>
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
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
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
                                <ThemedTextarea
                                    value={data.description}
                                    onChange={(e) => setData({...data, description: e.target.value})}
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
                                    {processing ? 'Uploading...' : 'Upload'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
