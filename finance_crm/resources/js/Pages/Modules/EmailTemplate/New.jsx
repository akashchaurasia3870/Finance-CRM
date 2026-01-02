import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function NewEmailTemplate() {
    const [data, setData] = useState({
        name: '',
        slug: '',
        subject: '',
        body: '',
        category: '',
        is_active: true,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/emailtemplate', data, {
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
                        <h1 className="text-2xl font-bold text-gray-900">Create Email Template</h1>
                        <p className="text-gray-600">Add a new email template</p>
                    </div>
                    <Link
                        href="/emailtemplate"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData({...data, name: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData({...data, slug: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Auto-generated if empty"
                            />
                            {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject *
                            </label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={(e) => setData({...data, subject: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                value={data.category}
                                onChange={(e) => setData({...data, category: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Marketing, Notification, Welcome"
                            />
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Body *
                            </label>
                            <textarea
                                value={data.body}
                                onChange={(e) => setData({...data, body: e.target.value})}
                                rows={10}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                                Active
                            </label>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/emailtemplate"
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}