import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function TargetDetail({ target }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this target?')) {
            router.delete(`/target/${target.id}`, {
                onSuccess: () => {
                    router.visit('/target');
                }
            });
        }
    };

    const calculateProgress = () => {
        if (target.target_value === 0) return 0;
        return Math.min(100, (target.achieved_value / target.target_value) * 100);
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 100) return 'bg-green-500';
        if (percentage >= 75) return 'bg-blue-500';
        if (percentage >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const progress = calculateProgress();

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Target Details</h1>
                        <p className="text-gray-600">View target information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link
                            href="/target"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back
                        </Link>
                        <Link
                            href={`/target/${target.id}/edit`}
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
                        <h3 className="text-lg font-medium">Target Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Name</label>
                                <p className="mt-1 text-sm text-gray-900">{target.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Assigned To</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {target.assigned_to ? target.assigned_to.name : 'Unassigned'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Target Value</label>
                                <p className="mt-1 text-sm text-gray-900">${target.target_value}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Achieved Value</label>
                                <p className="mt-1 text-sm text-gray-900">${target.achieved_value}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Start Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(target.start_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">End Date</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(target.end_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-500">Progress</label>
                                <div className="mt-2">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                                            <div 
                                                className={`h-4 rounded-full ${getProgressColor(progress)}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{progress.toFixed(1)}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        ${target.achieved_value} of ${target.target_value} achieved
                                    </p>
                                </div>
                            </div>
                            {target.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Created By</label>
                                    <p className="mt-1 text-sm text-gray-900">{target.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Created At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(target.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500">Updated At</label>
                                <p className="mt-1 text-sm text-gray-900">
                                    {new Date(target.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {target.description && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-500">Description</label>
                                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{target.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}