import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedTable, ThemedTableHeader, ThemedTableBody, ThemedTableRow, ThemedTableCell, ThemedInput, ThemedBadge } from '@/Components/ThemedComponents';

export default function SurveyView({ surveys = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSurveys = surveys.filter(survey => 
        survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (survey.description && survey.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this survey?')) {
            router.delete(`/survey/${id}`);
        }
    };

    const getStatusVariant = (status) => {
        const variants = {
            'draft': 'warning',
            'active': 'success',
            'paused': 'warning',
            'closed': 'error'
        };
        return variants[status] || 'info';
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Surveys</h1>
                        <p className="text-theme-secondary">Manage customer surveys and feedback</p>
                    </div>
                    <Link href="/survey/new">
                        <ThemedButton variant="primary">Create</ThemedButton>
                    </Link>
                </div>
                
                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium text-theme-primary">Survey List</h3>
                            <ThemedInput
                                type="text"
                                placeholder="Search surveys..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </div>
                    <ThemedTable>
                        <ThemedTableHeader>
                            <ThemedTableRow>
                                <ThemedTableCell header>Title</ThemedTableCell>
                                <ThemedTableCell header>Questions</ThemedTableCell>
                                <ThemedTableCell header>Status</ThemedTableCell>
                                <ThemedTableCell header>Start Date</ThemedTableCell>
                                <ThemedTableCell header>End Date</ThemedTableCell>
                                <ThemedTableCell header>Created</ThemedTableCell>
                                <ThemedTableCell header>Actions</ThemedTableCell>
                            </ThemedTableRow>
                        </ThemedTableHeader>
                        <ThemedTableBody>
                            {filteredSurveys.map((survey) => (
                                <ThemedTableRow key={survey.id}>
                                    <ThemedTableCell>
                                        <div className="font-medium text-theme-primary">{survey.title}</div>
                                        {survey.description && (
                                            <div className="text-sm text-theme-secondary truncate max-w-xs">
                                                {survey.description}
                                            </div>
                                        )}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {survey.questions ? survey.questions.length : 0} questions
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <ThemedBadge variant={getStatusVariant(survey.status)}>
                                            {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                                        </ThemedBadge>
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {survey.start_date ? new Date(survey.start_date).toLocaleDateString() : '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {survey.end_date ? new Date(survey.end_date).toLocaleDateString() : '-'}
                                    </ThemedTableCell>
                                    <ThemedTableCell className="text-theme-secondary">
                                        {new Date(survey.created_at).toLocaleDateString()}
                                    </ThemedTableCell>
                                    <ThemedTableCell>
                                        <div className="space-x-2">
                                            <Link href={`/survey/${survey.id}`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">View</ThemedButton>
                                            </Link>
                                            <Link href={`/survey/${survey.id}/edit`}>
                                                <ThemedButton variant="ghost" className="text-xs px-2 py-1">Edit</ThemedButton>
                                            </Link>
                                            {survey.status === 'active' && (
                                                <Link href={`/survey/${survey.id}/results`}>
                                                    <ThemedButton variant="ghost" className="text-xs px-2 py-1 text-green-600 hover:text-green-800">Results</ThemedButton>
                                                </Link>
                                            )}
                                            <ThemedButton 
                                                variant="ghost" 
                                                className="text-xs px-2 py-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(survey.id)}
                                            >
                                                Delete
                                            </ThemedButton>
                                        </div>
                                    </ThemedTableCell>
                                </ThemedTableRow>
                            ))}
                        </ThemedTableBody>
                    </ThemedTable>
                    {filteredSurveys.length === 0 && (
                        <div className="p-8 text-center text-theme-muted">
                            No surveys found.
                        </div>
                    )}
                </ThemedCard>
            </div>
        </Layout>
    );
}
