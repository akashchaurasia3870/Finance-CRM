import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

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

    const getStatusColor = (status) => {
        const colors = {
            'draft': 'bg-gray-100 text-gray-800',
            'active': 'bg-green-100 text-green-800',
            'paused': 'bg-yellow-100 text-yellow-800',
            'closed': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Surveys</h1>
                        <p className="text-gray-600">Manage customer surveys and feedback</p>
                    </div>
                    <Link
                        href="/survey/new"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Create Survey
                    </Link>
                </div>
                
                <div className="bg-white border rounded-lg">
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Survey List</h3>
                            <input
                                type="text"
                                placeholder="Search surveys..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border rounded-md px-3 py-2 w-64"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSurveys.map((survey) => (
                                    <tr key={survey.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{survey.title}</div>
                                            {survey.description && (
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {survey.description}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {survey.questions ? survey.questions.length : 0} questions
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(survey.status)}`}>
                                                {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {survey.start_date ? new Date(survey.start_date).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {survey.end_date ? new Date(survey.end_date).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {new Date(survey.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={`/survey/${survey.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/survey/${survey.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            {survey.status === 'active' && (
                                                <Link
                                                    href={`/survey/${survey.id}/results`}
                                                    className="text-green-600 hover:text-green-900"
                                                >
                                                    Results
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => handleDelete(survey.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredSurveys.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No surveys found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}