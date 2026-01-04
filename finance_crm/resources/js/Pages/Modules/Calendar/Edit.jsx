import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link, router } from '@inertiajs/react';
import { ThemedCard, ThemedButton, ThemedInput } from '@/Components/ThemedComponents';

export default function CalendarEdit({ calendar, users = [] }) {
    const [formData, setFormData] = useState({
        title: calendar.title || '',
        description: calendar.description || '',
        start_datetime: calendar.start_datetime ? new Date(calendar.start_datetime).toISOString().slice(0, 16) : '',
        end_datetime: calendar.end_datetime ? new Date(calendar.end_datetime).toISOString().slice(0, 16) : '',
        type: calendar.type || 'event',
        location: calendar.location || '',
        meeting_link: calendar.meeting_link || '',
        is_all_day: calendar.is_all_day || false,
        status: calendar.status || 'scheduled'
    });

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        
        router.put(`/calendar/${calendar.id}`, formData, {
            onSuccess: () => {
                router.visit('/calendar');
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-theme-primary">Edit Calendar Event</h1>
                        <p className="text-theme-secondary">Update event details</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href={`/calendar/${calendar.id}`}>
                            <ThemedButton variant="secondary">View Details</ThemedButton>
                        </Link>
                        <Link href="/calendar">
                            <ThemedButton variant="secondary">Back</ThemedButton>
                        </Link>
                    </div>
                </div>

                <ThemedCard>
                    <div className="p-4 border-b border-theme">
                        <h3 className="text-lg font-medium text-theme-primary">Event Information</h3>
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
                                        Type
                                    </label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full border border-theme rounded-md px-3 py-2 bg-theme-surface text-theme-primary"
                                    >
                                        <option value="event">Event</option>
                                        <option value="meeting">Meeting</option>
                                        <option value="reminder">Reminder</option>
                                        <option value="task">Task</option>
                                        <option value="note">Note</option>
                                    </select>
                                    {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        Start Date & Time *
                                    </label>
                                    <ThemedInput
                                        type="datetime-local"
                                        name="start_datetime"
                                        value={formData.start_datetime}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.start_datetime && <p className="text-red-500 text-sm mt-1">{errors.start_datetime}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-theme-primary mb-2">
                                        End Date & Time *
                                    </label>
                                    <ThemedInput
                                        type="datetime-local"
                                        name="end_datetime"
                                        value={formData.end_datetime}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.end_datetime && <p className="text-red-500 text-sm mt-1">{errors.end_datetime}</p>}
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
                                        placeholder="Event location or address"
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
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_all_day"
                                        checked={formData.is_all_day}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <label className="text-sm font-medium text-theme-primary">
                                        All Day Event
                                    </label>
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
                                    placeholder="Event description and details..."
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Link href={`/calendar/${calendar.id}`}>
                                    <ThemedButton variant="secondary">Cancel</ThemedButton>
                                </Link>
                                <ThemedButton
                                    type="submit"
                                    variant="primary"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Event'}
                                </ThemedButton>
                            </div>
                        </form>
                    </div>
                </ThemedCard>
            </div>
        </Layout>
    );
}
