import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';

export default function SurveyEdit({ survey }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        status: 'draft',
        questions: []
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (survey) {
            setFormData({
                title: survey.title || '',
                description: survey.description || '',
                start_date: survey.start_date ? survey.start_date.split('T')[0] : '',
                end_date: survey.end_date ? survey.end_date.split('T')[0] : '',
                status: survey.status || 'draft',
                questions: survey.questions || []
            });
        }
    }, [survey]);

    const questionTypes = [
        { value: 'text', label: 'Short Text' },
        { value: 'textarea', label: 'Long Text' },
        { value: 'radio', label: 'Single Choice' },
        { value: 'checkbox', label: 'Multiple Choice' },
        { value: 'dropdown', label: 'Dropdown' },
        { value: 'rating', label: 'Rating' }
    ];

    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, {
                question: '',
                type: 'text',
                is_required: false,
                sort_order: prev.questions.length + 1,
                options: []
            }]
        }));
    };

    const updateQuestion = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => 
                i === index ? { ...q, [field]: value } : q
            )
        }));
    };

    const removeQuestion = (index) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const addOption = (questionIndex) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => 
                i === questionIndex 
                    ? { ...q, options: [...(q.options || []), { option_text: '', sort_order: (q.options?.length || 0) + 1 }] }
                    : q
            )
        }));
    };

    const updateOption = (questionIndex, optionIndex, value) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => 
                i === questionIndex 
                    ? { 
                        ...q, 
                        options: (q.options || []).map((opt, j) => 
                            j === optionIndex ? { ...opt, option_text: value } : opt
                        )
                    }
                    : q
            )
        }));
    };

    const removeOption = (questionIndex, optionIndex) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => 
                i === questionIndex 
                    ? { ...q, options: (q.options || []).filter((_, j) => j !== optionIndex) }
                    : q
            )
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/survey/${survey.id}`, formData, {
            onError: (errors) => setErrors(errors)
        });
    };

    const needsOptions = (type) => ['radio', 'checkbox', 'dropdown'].includes(type);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Survey</h1>
                        <p className="text-gray-600">Update survey information and questions</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href="/survey"
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Back to Surveys
                        </Link>
                        <Link
                            href={`/survey/${survey.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            View Survey
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white border rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Survey Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                    required
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.end_date}
                                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                                    className="w-full border rounded-md px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                className="w-full border rounded-md px-3 py-2"
                            />
                        </div>
                    </div>

                    <div className="bg-white border rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Questions</h3>
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Add Question
                            </button>
                        </div>

                        {formData.questions.map((question, qIndex) => (
                            <div key={qIndex} className="border rounded-lg p-4 mb-4">
                                <div className="flex justify-between items-start mb-3">
                                    <h4 className="font-medium">Question {qIndex + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(qIndex)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Question Text *
                                        </label>
                                        <input
                                            type="text"
                                            value={question.question}
                                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                            className="w-full border rounded-md px-3 py-2"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Question Type
                                        </label>
                                        <select
                                            value={question.type}
                                            onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                                            className="w-full border rounded-md px-3 py-2"
                                        >
                                            {questionTypes.map(type => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={question.is_required}
                                            onChange={(e) => updateQuestion(qIndex, 'is_required', e.target.checked)}
                                            className="mr-2"
                                        />
                                        Required question
                                    </label>
                                </div>

                                {needsOptions(question.type) && (
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Options
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => addOption(qIndex)}
                                                className="text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                Add Option
                                            </button>
                                        </div>
                                        {(question.options || []).map((option, oIndex) => (
                                            <div key={oIndex} className="flex items-center gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={option.option_text}
                                                    onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                    placeholder={`Option ${oIndex + 1}`}
                                                    className="flex-1 border rounded-md px-3 py-2"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeOption(qIndex, oIndex)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {formData.questions.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No questions added yet. Click "Add Question" to get started.
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Link
                            href={`/survey/${survey.id}`}
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        >
                            Update Survey
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}