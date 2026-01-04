import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function EditEmail({ email, templates = [] }) {
    const [data, setData] = useState({
        to_email: email.to_email || '',
        from_email: email.from_email || '',
        cc: email.cc || '',
        bcc: email.bcc || '',
        subject: email.subject || '',
        body: email.body || '',
        email_template_id: email.email_template_id || '',
        status: email.status || 'draft',
        failure_reason: email.failure_reason || '',
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
        
        router.put(`/email/${email.id}`, data, {
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Email</h1>
                        <p className="text-theme-secondary">Update email information</p>
                    </div>
                    <Link href="/email">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Email Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Email Template
                                </label>
                                <select
                                    value={data.email_template_id}
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                >
                                    <option value="">Select Template (Optional)</option>
                                    {templates.map((template) => (
                                        <option key={template.id} value={template.id}>
                                            {template.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        To Email *
                                    </label>
                                    <ThemedInput
                                        type="email"
                                        value={data.to_email}
                                        onChange={(e) => setData({...data, to_email: e.target.value})}
                                        required
                                    />
                                    {errors.to_email && <p className="text-red-500 text-sm mt-1">{errors.to_email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        From Email
                                    </label>
                                    <ThemedInput
                                        type="email"
                                        value={data.from_email}
                                        onChange={(e) => setData({...data, from_email: e.target.value})}
                                    />
                                    {errors.from_email && <p className="text-red-500 text-sm mt-1">{errors.from_email}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        CC
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.cc}
                                        onChange={(e) => setData({...data, cc: e.target.value})}
                                        placeholder="email1@example.com, email2@example.com"
                                    />
                                    {errors.cc && <p className="text-red-500 text-sm mt-1">{errors.cc}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        BCC
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.bcc}
                                        onChange={(e) => setData({...data, bcc: e.target.value})}
                                        placeholder="email1@example.com, email2@example.com"
                                    />
                                    {errors.bcc && <p className="text-red-500 text-sm mt-1">{errors.bcc}</p>}
                                </div>
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
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData({...data, status: e.target.value})}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-accent"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="queued">Queued</option>
                                    <option value="sent">Sent</option>
                                    <option value="failed">Failed</option>
                                </select>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                            </div>

                            {data.status === 'failed' && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Failure Reason
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={data.failure_reason}
                                        onChange={(e) => setData({...data, failure_reason: e.target.value})}
                                        placeholder="Describe the failure reason"
                                    />
                                    {errors.failure_reason && <p className="text-red-500 text-sm mt-1">{errors.failure_reason}</p>}
                                </div>
                            )}

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

                            <div className="flex justify-end space-x-3">
                                <Link href="/email">
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
