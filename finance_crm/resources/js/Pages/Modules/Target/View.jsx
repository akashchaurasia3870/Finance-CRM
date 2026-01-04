import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function TargetView({ targets = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTargets = targets.filter(target => 
        target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (target.description && target.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (target.assigned_to && target.assigned_to.name && target.assigned_to.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this target?')) {
            router.delete(`/target/${id}`);
        }
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 100) return 'bg-green-500';
        if (percentage >= 75) return 'bg-blue-500';
        if (percentage >= 50) return 'bg-yellow-500';
        return 'bg-red-1000';
    };

    const calculateProgress = (target) => {
        if (target.target_value === 0) return 0;
        return Math.min(100, (target.achieved_value / target.target_value) * 100);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Targets</h1>
                        <p className="text-theme-secondary">Manage target information</p>
                    </div>
                    <Link href="/target/new">
                        <ThemedButton variant="primary">Add Target</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Target List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search targets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Name</ThemedTableCell>
                                <ThemedTableCell header>Target Value</ThemedTableCell>
                                <ThemedTableCell header>Achieved</ThemedTableCell>
                                <ThemedTableCell header>Progress</ThemedTableCell>
                                <ThemedTableCell header>Period</ThemedTableCell>
                                <ThemedTableCell header>Assigned To</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredTargets.map((target) => {
                                const progress = calculateProgress(target);
                                return (
                                    <ThemedTableRow key={target.id}>
                                        <ThemedTableCell>
                                            <div className="font-medium text-theme-primary">{target.name}</div>
                                            {target.description && (
                                                <div className="text-sm text-theme-muted">{target.description.substring(0, 50)}...</div>
                                            )}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            ${target.target_value}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            ${target.achieved_value}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${getProgressColor(progress)}`}
                                                        style={{ width: `${progress}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-theme-secondary">{progress.toFixed(1)}%</span>
                                            </div>
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {new Date(target.start_date).toLocaleDateString()} - {new Date(target.end_date).toLocaleDateString()}
                                        </ThemedTableCell>
                                        <ThemedTableCell className="text-theme-primary">
                                            {target.assigned_to ? target.assigned_to.name : 'Unassigned'}
                                        </ThemedTableCell>
                                        <ThemedTableCell>
                                            <div className="space-x-2">
                                                <Link href={`/target/${target.id}`}>
                                                    <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                                </Link>
                                                <Link href={`/target/${target.id}/edit`}>
                                                    <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                                </Link>
                                                <ThemedButton 
                                                    variant="ghost" 
                                                    className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                    onClick={() => handleDelete(target.id)}
                                                >
                                                    Delete
                                                </ThemedButton>
                                            </div>
                                        </ThemedTableCell>
                                    </ThemedTableRow>
                                );
                            })}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredTargets.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No targets found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
