import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function TaskDetail({ task }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${task.id}`, {
                onSuccess: () => {
                    router.visit('/tasks');
                }
            });
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'in_progress': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'low': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'high': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const isOverdue = () => {
        if (!task.due_date || task.status === 'completed' || task.status === 'cancelled') return false;
        return new Date(task.due_date) < new Date();
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
                        <p className="text-gray-600">View task information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/tasks"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/tasks/${task.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    <div className="p-6 border-b">
                        <h3 className="text-lg font-medium">Task Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Title</label>
                                <p className="mt-1 text-sm text-gray-900">{task.title}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Assigned To</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {task.assigned_to ? task.assigned_to.name : 'Unassigned'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Priority</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Status</label>
                                <span className={`mt-1 inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                                    {task.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Start Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Not set'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Due Date</label>
                                <p className={`mt-1 text-sm ${isOverdue() ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Not set'}
                                    {isOverdue() && <span className="ml-1">(Overdue)</span>}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Completed At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'Not completed'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Entity</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {task.entity_type && task.entity_id ? `${task.entity_type} #${task.entity_id}` : 'No entity linked'}
                                </p>
                            </div>
                            {task.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{task.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(task.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(task.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {task.description && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">Description</label>
                                    <div className="mt-1 p-4 bg-gray-50 rounded-md">
                                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{task.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}