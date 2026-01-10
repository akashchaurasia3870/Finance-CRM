import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedTextarea } from '@/Components/ThemedComponents';

export default function EditNote({ note, clients = [] }) {
    const [data, setData] = useState({
        title: note.title || '',
        content: note.content || '',
        category: note.category || '',
        client_id: note.client_id || '',
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
        
        router.post(`/notes/${note.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                router.visit('/notes');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Note</h1>
                        <p className="text-theme-secondary">Update note information</p>
                    </div>
                    <Link href="/notes">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Note Information</h3>
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
                                        Title *
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData({...data, title: e.target.value})}
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData({...data, category: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="personal">Personal</option>
                                        <option value="work">Work</option>
                                        <option value="meeting">Meeting</option>
                                        <option value="follow-up">Follow-up</option>
                                        <option value="important">Important</option>
                                    </select>
                                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Client
                                    </label>
                                    <select
                                        value={data.client_id}
                                        onChange={(e) => setData({...data, client_id: e.target.value})}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                    >
                                        <option value="">Select Client (Optional)</option>
                                        {clients.map((client) => (
                                            <option key={client.id} value={client.id}>{client.name}</option>
                                        ))}
                                    </select>
                                    {errors.client_id && <p className="text-red-500 text-sm mt-1">{errors.client_id}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Content *
                                </label>
                                <ThemedTextarea
                                    value={data.content}
                                    onChange={(e) => setData({...data, content: e.target.value})}
                                    rows="6"
                                    required
                                />
                                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/notes">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Note'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
