import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

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
        return 'bg-red-1000';
    };

    const progress = calculateProgress();

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Target Details</h1>
                        <p className="text-theme-secondary">View target information</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/target">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/target/${target.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Target Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Name</label>
                                <p className="mt-1 text-sm text-theme-primary">{target.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Assigned To</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {target.assigned_to ? target.assigned_to.name : 'Unassigned'}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Target Value</label>
                                <p className="mt-1 text-sm text-theme-primary">${target.target_value}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Achieved Value</label>
                                <p className="mt-1 text-sm text-theme-primary">${target.achieved_value}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Start Date</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(target.start_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">End Date</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(target.end_date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-theme-muted">Progress</label>
                                <div className="mt-2">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-4 mr-4">
                                            <div 
                                                className={`h-4 rounded-full ${getProgressColor(progress)}`}
                                                style={{ width: `${progress}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm font-medium text-theme-primary">{progress.toFixed(1)}%</span>
                                    </div>
                                    <p className="text-xs text-theme-muted mt-1">
                                        ${target.achieved_value} of ${target.target_value} achieved
                                    </p>
                                </div>
                            </div>
                            {target.creator && (
                                <div>
                                    <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                    <p className="mt-1 text-sm text-theme-primary">{target.creator.name}</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(target.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Updated At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(target.updated_at).toLocaleString()}
                                </p>
                            </div>
                            {target.description && (
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-theme-muted">Description</label>
                                    <p className="mt-1 text-sm text-theme-primary whitespace-pre-wrap">{target.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
