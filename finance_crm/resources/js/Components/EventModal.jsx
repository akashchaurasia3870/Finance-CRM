import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function EventModal({ isOpen, onClose, selectedDate }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start_datetime: selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '',
        end_datetime: selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000 + 3600000).toISOString().slice(0, 16) : '',
        type: 'event',
        location: '',
        meeting_link: '',
        is_all_day: false,
        status: 'scheduled'
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/calendar', formData, {
            onError: (errors) => setErrors(errors),
            onSuccess: () => {
                onClose();
                setFormData({
                    title: '',
                    description: '',
                    start_datetime: '',
                    end_datetime: '',
                    type: 'event',
                    location: '',
                    meeting_link: '',
                    is_all_day: false,
                    status: 'scheduled'
                });
                setErrors({});
            }
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-theme-primary rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-theme-primary">
                            Add New Event
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="event">Event</option>
                                <option value="meeting">Meeting</option>
                                <option value="reminder">Reminder</option>
                                <option value="task">Task</option>
                                <option value="note">Note</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Start Time *
                                </label>
                                <input
                                    type="datetime-local"
                                    name="start_datetime"
                                    value={formData.start_datetime}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    End Time *
                                </label>
                                <input
                                    type="datetime-local"
                                    name="end_datetime"
                                    value={formData.end_datetime}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="is_all_day"
                                    checked={formData.is_all_day}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-700">All Day Event</span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Event location"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Meeting Link
                            </label>
                            <input
                                type="url"
                                name="meeting_link"
                                value={formData.meeting_link}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://meet.example.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Event description..."
                            />
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-theme-tertiary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
