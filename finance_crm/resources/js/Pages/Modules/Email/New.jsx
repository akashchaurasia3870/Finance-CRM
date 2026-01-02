import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function NewEmail({ templates = [], campaigns = [] }) {
    const [data, setData] = useState({
        to_email: '',
        from_email: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        email_template_id: '',
        campaign_id: '',
        status: 'draft',
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleTemplateChange = (templateId) => {
        const template = templates.find(t => t.id == templateId);
        if (template) {
            setData({
                ...data,
                email_template_id: templateId,
                subject: template.subject,
                body: template.body,
            });
        } else {
            setData({...data, email_template_id: templateId});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/email', data, {
            onSuccess: () => {
                router.visit('/email');
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
                        <h1 className="text-2xl font-bold text-gray-900">Create Email</h1>
                        <p className="text-gray-600">Compose a new email</p>
                    </div>
                    <Link
                        href="/email"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Template
                            </label>
                            <select
                                value={data.email_template_id}
                                onChange={(e) => handleTemplateChange(e.target.value)}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Template (Optional)</option>
                                {templates.map((template) => (
                                    <option key={template.id} value={template.id}>
                                        {template.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Campaign
                            </label>
                            <select
                                value={data.campaign_id}
                                onChange={(e) => setData({...data, campaign_id: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Campaign (Optional)</option>
                                {campaigns.map((campaign) => (
                                    <option key={campaign.id} value={campaign.id}>
                                        {campaign.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    To Email {!data.campaign_id && '*'}
                                </label>
                                <input
                                    type="email"
                                    value={data.to_email}
                                    onChange={(e) => setData({...data, to_email: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required={!data.campaign_id}
                                    placeholder={data.campaign_id ? "Optional when campaign is selected" : "Required"}
                                />
                                {errors.to_email && <p className="text-red-500 text-sm mt-1">{errors.to_email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    From Email
                                </label>
                                <input
                                    type="email"
                                    value={data.from_email}
                                    onChange={(e) => setData({...data, from_email: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.from_email && <p className="text-red-500 text-sm mt-1">{errors.from_email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CC
                                </label>
                                <input
                                    type="text"
                                    value={data.cc}
                                    onChange={(e) => setData({...data, cc: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="email1@example.com, email2@example.com"
                                />
                                {errors.cc && <p className="text-red-500 text-sm mt-1">{errors.cc}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    BCC
                                </label>
                                <input
                                    type="text"
                                    value={data.bcc}
                                    onChange={(e) => setData({...data, bcc: e.target.value})}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="email1@example.com, email2@example.com"
                                />
                                {errors.bcc && <p className="text-red-500 text-sm mt-1">{errors.bcc}</p>}
                            </div>
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
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={(e) => setData({...data, status: e.target.value})}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="queued">Queued</option>
                                <option value="sent">Sent</option>
                                <option value="failed">Failed</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
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

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/email"
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