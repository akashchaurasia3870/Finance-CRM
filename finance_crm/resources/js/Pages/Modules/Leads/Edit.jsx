import React from 'react';
import Layout from '@/Layouts/Layout';
import { useForm, Link } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function LeadsEdit({ lead, users = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        name: lead?.name || '',
        email: lead?.email || '',
        phone: lead?.phone || '',
        company: lead?.company || '',
        status: lead?.status || 'new',
        source: lead?.source || '',
        value: lead?.value || '',
        assigned_to: lead?.assigned_to || '',
        notes: lead?.notes || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/leads/${lead.id}`);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Link href="/leads">
                        <ThemedButton variant="ghost">← Back</ThemedButton>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Lead</h1>
                        <p className="text-theme-secondary">Update lead information</p>
                    </div>
                </div>

                <ThemedCard className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Name *</label>
                                <ThemedInput
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={errors.name ? 'border-red-500' : ''}
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Email</label>
                                <ThemedInput
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-red-500' : ''}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Phone</label>
                                <ThemedInput
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Company</label>
                                <ThemedInput
                                    type="text"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Status</label>
                                <ThemedSelect
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="qualified">Qualified</option>
                                    <option value="converted">Converted</option>
                                    <option value="lost">Lost</option>
                                </ThemedSelect>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Source</label>
                                <ThemedInput
                                    type="text"
                                    value={data.source}
                                    onChange={(e) => setData('source', e.target.value)}
                                    placeholder="e.g., Website, Referral, Cold Call"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Estimated Value</label>
                                <ThemedInput
                                    type="number"
                                    step="0.01"
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">Assigned To</label>
                                <ThemedSelect
                                    value={data.assigned_to}
                                    onChange={(e) => setData('assigned_to', e.target.value)}
                                >
                                    <option value="">Unassigned</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </ThemedSelect>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-primary mb-2">Notes</label>
                            <textarea
                                rows={4}
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="w-full px-3 py-2 border border-theme rounded-md bg-theme-primary text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Additional notes about this lead..."
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link href="/leads">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton type="submit" variant="primary" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Lead'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}