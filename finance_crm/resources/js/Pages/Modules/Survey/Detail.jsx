import React from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';

export default function SurveyDetail({ survey }) {
    const getStatusColor = (status) => {
        const colors = {
            'draft': 'bg-gray-100 text-gray-800',
            'active': 'bg-green-100 text-green-800',
            'paused': 'bg-yellow-100 text-yellow-800',
            'closed': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
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

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Survey Details</h1>
                        <p className="text-gray-600">View survey information and questions</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href="/survey"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back to Surveys
                        </Link>
                        <Link
                            href={`/survey/${survey.id}/edit`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Edit Survey
                        </Link>
                        {survey.status === 'active' && (
                            <Link
                                href={`/survey/${survey.id}/results`}
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                            >
                                View Results
                            </Link>
                        )}
                    </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Survey Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <p className="text-gray-900">{survey.title}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(survey.status)}`}>
                                {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                            </span>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <p className="text-gray-900">
                                {survey.start_date ? new Date(survey.start_date).toLocaleDateString() : 'Not set'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <p className="text-gray-900">
                                {survey.end_date ? new Date(survey.end_date).toLocaleDateString() : 'Not set'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created By
                            </label>
                            <p className="text-gray-900">
                                {survey.creator ? survey.creator.name : 'Unknown'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Created At
                            </label>
                            <p className="text-gray-900">
                                {new Date(survey.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    {survey.description && (
                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <p className="text-gray-900">{survey.description}</p>
                        </div>
                    )}
                </div>

                <div className="bg-white border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">
                        Questions ({survey.questions ? survey.questions.length : 0})
                    </h3>

                    {survey.questions && survey.questions.length > 0 ? (
                        <div className="space-y-4">
                            {survey.questions.map((question, index) => (
                                <div key={question.id} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-medium text-gray-900">
                                            Question {index + 1}
                                            {question.is_required && (
                                                <span className="text-red-500 ml-1">*</span>
                                            )}
                                        </h4>
                                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                            {getQuestionTypeLabel(question.type)}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-700 mb-3">{question.question}</p>

                                    {question.options && question.options.length > 0 && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Options:
                                            </label>
                                            <ul className="list-disc list-inside space-y-1">
                                                {question.options.map((option, optIndex) => (
                                                    <li key={option.id} className="text-gray-600">
                                                        {option.option_text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {question.type === 'rating' && (
                                        <div className="text-sm text-gray-600">
                                            Rating scale (1-5 or 1-10)
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No questions added to this survey yet.
                        </div>
                    )}
                </div>

                {survey.status === 'active' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
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
                )}
            </div>
        </Layout>
    );
}