import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

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
    const [processing, setProcessing] = useState(false);

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
        setProcessing(true);
        
        router.put(`/survey/${survey.id}`, formData, {
            onSuccess: () => {
                router.visit('/survey');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    const needsOptions = (type) => ['radio', 'checkbox', 'dropdown'].includes(type);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Survey</h1>
                        <p className="text-theme-secondary">Update survey information and questions</p>
                    </div>
                    <div className="flex space-x-2">
                        <Link href="/survey">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                        <Link href={`/survey/${survey.id}`}>
                            <ThemedButton variant="primary">View Survey</ThemedButton>
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <h3 className="text-lg font-medium text-theme-primary">Survey Details</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Title *
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="active">Active</option>
                                        <option value="paused">Paused</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Start Date
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        End Date
                                    </label>
                                    <ThemedInput
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                />
                            </div>
                        </div>
                    </ThemedCard>

                    <ThemedCard>
                        <div className="p-4 border-b border-theme">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium text-theme-primary">Questions</h3>
                                <ThemedButton
                                    type="button"
                                    onClick={addQuestion}
                                    variant="primary"
                                >
                                    Add Question
                                </ThemedButton>
                            </div>
                        </div>
                        <div className="p-6">
                            {formData.questions.map((question, qIndex) => (
                                <div key={qIndex} className="border border-theme rounded-lg p-4 mb-4 bg-theme-surface">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-medium text-theme-primary">Question {qIndex + 1}</h4>
                                        <ThemedButton
                                            type="button"
                                            onClick={() => removeQuestion(qIndex)}
                                            variant="ghost"
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </ThemedButton>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                        <div>
                                            <label className="block text-sm font-medium text-theme-primary mb-2">
                                                Question Text *
                                            </label>
                                            <ThemedInput
                                                type="text"
                                                value={question.question}
                                                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-theme-primary mb-2">
                                                Question Type
                                            </label>
                                            <select
                                                value={question.type}
                                                onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                                                className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
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
                                            <span className="text-sm font-medium text-theme-primary">Required question</span>
                                        </label>
                                    </div>

                                    {needsOptions(question.type) && (
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <label className="block text-sm font-medium text-theme-primary">
                                                    Options
                                                </label>
                                                <ThemedButton
                                                    type="button"
                                                    onClick={() => addOption(qIndex)}
                                                    variant="ghost"
                                                    className="text-xs"
                                                >
                                                    Add Option
                                                </ThemedButton>
                                            </div>
                                            {(question.options || []).map((option, oIndex) => (
                                                <div key={oIndex} className="flex items-center gap-2 mb-2">
                                                    <ThemedInput
                                                        type="text"
                                                        value={option.option_text}
                                                        onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                        placeholder={`Option ${oIndex + 1}`}
                                                        className="flex-1"
                                                    />
                                                    <ThemedButton
                                                        type="button"
                                                        onClick={() => removeOption(qIndex, oIndex)}
                                                        variant="ghost"
                                                        className="text-red-600 hover:text-red-800 text-xs px-2 py-1"
                                                    >
                                                        Remove
                                                    </ThemedButton>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {formData.questions.length === 0 && (
                                <div className="text-center py-8 text-theme-muted">
                                    No questions added yet. Click "Add Question" to get started.
                                </div>
                            )}
                        </div>
                    </ThemedCard>

                    <div className="flex justify-end space-x-3">
                        <Link href={`/survey/${survey.id}`}>
                            <ThemedButton variant="secondary">Cancel</ThemedButton>
                        </Link>
                        <ThemedButton
                            type="submit"
                            variant="primary"
                            disabled={processing}
                        >
                            {processing ? 'Updating...' : 'Update Survey'}
                        </ThemedButton>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
