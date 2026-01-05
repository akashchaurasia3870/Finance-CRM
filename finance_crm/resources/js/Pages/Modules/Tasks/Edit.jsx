import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput, ThemedSelect } from '@/Components/ThemedComponents';

export default function EditTask({ task, users = [] }) {
    const [data, setData] = useState({
        title: task.title || '',
        description: task.description || '',
        assigned_to: task.assigned_to || '',
        entity_type: task.entity_type || '',
        entity_id: task.entity_id || '',
        start_date: task.start_date || '',
        due_date: task.due_date || '',
        completed_at: task.completed_at || '',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
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
        
        router.post(`/tasks/${task.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                router.visit('/tasks');
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
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Task</h1>
                        <p className="text-theme-secondary">Update task information</p>
                    </div>
                    <Link href="/tasks">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard className="p-6">
                    {errors.error && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
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
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
                                    Assigned To
                                </label>
                                <ThemedSelect
                                    value={data.assigned_to}
                                    onChange={(e) => setData({...data, assigned_to: e.target.value})}
                                >
                                    <option value="">Select User</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.name}</option>
                                    ))}
                                </ThemedSelect>
                                {errors.assigned_to && <p className="text-red-500 text-sm mt-1">{errors.assigned_to}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
                                    Priority
                                </label>
                                <ThemedSelect
                                    value={data.priority}
                                    onChange={(e) => setData({...data, priority: e.target.value})}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </ThemedSelect>
                                {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
                                    Status
                                </label>
                                <ThemedSelect
                                    value={data.status}
                                    onChange={(e) => setData({...data, status: e.target.value})}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </ThemedSelect>
                                {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
                                    Start Date
                                </label>
                                <ThemedInput
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData({...data, start_date: e.target.value})}
                                />
                                {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
                                    Due Date
                                </label>
                                <ThemedInput
                                    type="date"
                                    value={data.due_date}
                                    onChange={(e) => setData({...data, due_date: e.target.value})}
                                />
                                {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
                                    Entity Type
                                </label>
                                <ThemedInput
                                    type="text"
                                    value={data.entity_type}
                                    onChange={(e) => setData({...data, entity_type: e.target.value})}
                                    placeholder="e.g., Client, Lead, Project"
                                />
                                {errors.entity_type && <p className="text-red-500 text-sm mt-1">{errors.entity_type}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-secondary mb-2">
                                    Entity ID
                                </label>
                                <ThemedInput
                                    type="number"
                                    value={data.entity_id}
                                    onChange={(e) => setData({...data, entity_id: e.target.value})}
                                    placeholder="Related record ID"
                                />
                                {errors.entity_id && <p className="text-red-500 text-sm mt-1">{errors.entity_id}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-theme-secondary mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData({...data, description: e.target.value})}
                                className="w-full px-3 py-2 border border-theme rounded-md bg-theme-primary text-theme-primary placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                rows="4"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link href="/tasks">
                                <ThemedButton variant="ghost">Cancel</ThemedButton>
                            </Link>
                            <ThemedButton
                                type="submit"
                                disabled={processing}
                                variant="primary"
                            >
                                {processing ? 'Updating...' : 'Update Task'}
                            </ThemedButton>
                        </div>
                    </form>
                </ThemedCard>
            </div>
        </Layout>
    );
}
