import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function EditEmailTemplate({ template }) {
    const [data, setData] = useState({
        name: template.name || '',
        slug: template.slug || '',
        subject: template.subject || '',
        body: template.body || '',
        category: template.category || '',
        is_active: template.is_active ?? true,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/emailtemplate/${template.id}`, data, {
            onSuccess: () => {
                router.visit('/emailtemplate');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Email Template</h1>
                        <p className="text-theme-secondary">Update template information</p>
                    </div>
                    <Link href="/emailtemplate">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Template Information</h3>
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
                                    Slug
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData({...data, slug: e.target.value})}
                                />
                                {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Subject *
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData({...data, subject: e.target.value})}
                                    required
                                />
                                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Category
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData({...data, category: e.target.value})}
                                    placeholder="e.g., Marketing, Notification, Welcome"
                                />
                                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Body *
                                </label>
                                <textarea
                                    value={data.body}
                                    onChange={(e) => setData({...data, body: e.target.value})}
                                    rows={10}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    placeholder="HTML content supported"
                                    required
                                />
                                {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
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
                                <Link href="/emailtemplate">
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
