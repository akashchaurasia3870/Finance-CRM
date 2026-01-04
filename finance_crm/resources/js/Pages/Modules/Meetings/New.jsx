import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function MeetingsNew({ users = [] }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_time: '',
        end_time: '',
        location: '',
        meeting_link: '',
        organizer_id: '',
        status: 'scheduled'
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.post('/meetings', formData, {
            onSuccess: () => {
                router.visit('/meetings');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Create Meeting</h1>
                        <p className="text-theme-secondary">Schedule a new meeting</p>
                    </div>
                    <Link href="/meetings">
                        <ThemedButton variant="secondary">Back</ThemedButton>
                    </Link>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Meeting Information</h3>
                    </div>
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Title *
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Organizer
                                    </label>
                                    <select
                                        name="organizer_id"
                                        value={formData.organizer_id}
                                        onChange={handleChange}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="">Select Organizer</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.organizer_id && <p className="text-red-500 text-sm mt-1">{errors.organizer_id}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Start Time *
                                    </label>
                                    <ThemedInput
                                        type="datetime-local"
                                        name="start_time"
                                        value={formData.start_time}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.start_time && <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        End Time *
                                    </label>
                                    <ThemedInput
                                        type="datetime-local"
                                        name="end_time"
                                        value={formData.end_time}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.end_time && <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Location
                                    </label>
                                    <ThemedInput
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Meeting room or address"
                                    />
                                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Meeting Link
                                    </label>
                                    <ThemedInput
                                        type="url"
                                        name="meeting_link"
                                        value={formData.meeting_link}
                                        onChange={handleChange}
                                        placeholder="https://meet.example.com/..."
                                    />
                                    {errors.meeting_link && <p className="text-red-500 text-sm mt-1">{errors.meeting_link}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="scheduled">Scheduled</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    placeholder="Meeting agenda and details..."
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-theme-primary mb-2">
                                    Meeting Notes
                                </label>
                                <textarea
                                    name="notes"
                                    rows={4}
                                    className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    placeholder="Add meeting notes or agenda..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href="/meetings">
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create Meeting'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
