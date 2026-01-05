import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedBadge } from '@/Components/ThemedComponents';

export default function SurveyDetail({ survey }) {
    const getStatusVariant = (status) => {
        const variants = {
            'draft': 'warning',
            'active': 'success',
            'paused': 'warning',
            'closed': 'error'
        };
        return variants[status] || 'info';
    };

    const getQuestionTypeLabel = (type) => {
        const types = {
            'text': 'Short Text',
            'textarea': 'Long Text',
            'radio': 'Single Choice',
            'checkbox': 'Multiple Choice',
            'dropdown': 'Dropdown',
            'rating': 'Rating'
        };
        return types[type] || type;
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this survey?')) {
            router.delete(`/survey/${survey.id}`, {
                onSuccess: () => {
                    router.visit('/survey');
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Survey Details</h1>
                        <p className="text-theme-secondary">View survey information and questions</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/survey">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/survey/${survey.id}/edit`}>
                            <ThemedButton variant="primary">Edit</ThemedButton>
                        </Link>
                        {survey.status === 'active' && (
                            <Link href={`/survey/${survey.id}/results`}>
                                <ThemedButton variant="success">View Results</ThemedButton>
                            </Link>
                        )}
                        <ThemedButton variant="danger" onClick={handleDelete}>
                            Delete
                        </ThemedButton>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Survey Information</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Title</label>
                                <p className="mt-1 text-sm text-theme-primary">{survey.title}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Status</label>
                                <div className="mt-1">
                                    <ThemedBadge variant={getStatusVariant(survey.status)}>
                                        {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                                    </ThemedBadge>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Start Date</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {survey.start_date ? new Date(survey.start_date).toLocaleDateString() : 'Not set'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">End Date</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {survey.end_date ? new Date(survey.end_date).toLocaleDateString() : 'Not set'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created By</label>
                                <p className="mt-1 text-sm text-theme-primary">
                                    {survey.creator ? survey.creator.name : 'Unknown'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-muted">Created At</label>
                                <p className="mt-1 text-sm text-theme-secondary">
                                    {new Date(survey.created_at).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        {survey.description && (
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-theme-muted">Description</label>
                                <p className="mt-1 text-sm text-theme-primary">{survey.description}</p>
                            </div>
                        )}
                    </div>
                </ThemedCard>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">
                            Questions ({survey.questions ? survey.questions.length : 0})
                        </h3>
                    </div>
                    <div className="p-6">
                        {survey.questions && survey.questions.length > 0 ? (
                            <div className="space-y-4">
                                {survey.questions.map((question, index) => (
                                    <div key={question.id} className="border border-theme rounded-lg p-4 bg-theme-surface">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium text-theme-primary">
                                                Question {index + 1}
                                                {question.is_required && (
                                                    <span className="text-red-500 ml-1">*</span>
                                                )}
                                            </h4>
                                            <ThemedBadge variant="info">
                                                {getQuestionTypeLabel(question.type)}
                                            </ThemedBadge>
                                        </div>
                                        
                                        <p className="text-theme-secondary mb-3">{question.question}</p>

                                        {question.options && question.options.length > 0 && (
                                            <div>
                                                <label className="block text-sm font-medium text-theme-muted mb-2">
                                                    Options:
                                                </label>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {question.options.map((option, optIndex) => (
                                                        <li key={option.id} className="text-theme-secondary">
                                                            {option.option_text}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {question.type === 'rating' && (
                                            <div className="text-sm text-theme-muted">
                                                Rating scale (1-5 or 1-10)
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-theme-muted">
                                No questions added to this survey yet.
                            </div>
                        )}
                    </div>
                </ThemedCard>

                {survey.status === 'active' && (
                    <ThemedCard>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">
                                        Survey is Active
                                    </h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <p>This survey is currently active and accepting responses from users.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ThemedCard>
                )}
            </div>
        </Layout>
    );
}
