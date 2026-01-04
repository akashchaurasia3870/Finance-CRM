import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';
import MonthView from '@/Components/MonthView';
import WeekView from '@/Components/WeekView';
import DayView from '@/Components/DayView';
import EventModal from '@/Components/EventModal';

export default function CalendarView({ calendars = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('month');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
    };

    const getEventsForDate = (date) => {
        return calendars.filter(calendar => {
            const eventDate = new Date(calendar.start_datetime);
            return eventDate.toDateString() === date.toDateString();
        });
    };

    const navigateDate = (direction) => {
        const newDate = new Date(currentDate);
        if (viewMode === 'month') {
            newDate.setMonth(currentDate.getMonth() + direction);
        } else if (viewMode === 'week') {
            newDate.setDate(currentDate.getDate() + (direction * 7));
        } else {
            newDate.setDate(currentDate.getDate() + direction);
        }
        setCurrentDate(newDate);
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'meeting': return 'bg-purple-500';
            case 'event': return 'bg-blue-500';
            case 'reminder': return 'bg-yellow-500';
            case 'task': return 'bg-orange-500';
            case 'note': return 'bg-gray-500';
            default: return 'bg-gray-500';
        }
    };

    const getDateTitle = () => {
        if (viewMode === 'month') {
            return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        } else if (viewMode === 'week') {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        } else {
            return currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Calendar View</h1>
                        <p className="text-gray-600">Interactive calendar interface</p>
                    </div>
                    <Link
                        href="/calendar"
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                    >
                        Back to List
                    </Link>
                </div>

                {/* Calendar Header */}
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigateDate(-1)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h2 className="text-xl font-semibold text-gray-900">
                                {getDateTitle()}
                            </h2>
                            <button
                                onClick={() => navigateDate(1)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setCurrentDate(new Date())}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                            >
                                Today
                            </button>
                        </div>
                        
                        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                            {['day', 'week', 'month'].map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        viewMode === mode 
                                            ? 'bg-white text-gray-900 shadow-sm' 
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Calendar Content */}
                {viewMode === 'month' && (
                    <MonthView 
                        currentDate={currentDate}
                        calendars={calendars}
                        getEventsForDate={getEventsForDate}
                        getTypeColor={getTypeColor}
                        onDateClick={handleDateClick}
                    />
                )}
                {viewMode === 'week' && (
                    <WeekView 
                        currentDate={currentDate}
                        calendars={calendars}
                        getEventsForDate={getEventsForDate}
                        getTypeColor={getTypeColor}
                        onDateClick={handleDateClick}
                    />
                )}
                {viewMode === 'day' && (
                    <DayView 
                        currentDate={currentDate}
                        calendars={calendars}
                        getEventsForDate={getEventsForDate}
                        getTypeColor={getTypeColor}
                        onDateClick={handleDateClick}
                    />
                )}

                {/* Legend */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-sm font-medium mb-3 text-gray-900">Event Types</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { type: 'meeting', label: 'Meeting' },
                            { type: 'event', label: 'Event' },
                            { type: 'reminder', label: 'Reminder' },
                            { type: 'task', label: 'Task' },
                            { type: 'note', label: 'Note' }
                        ].map(({ type, label }) => (
                            <div key={type} className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded ${getTypeColor(type)}`}></div>
                                <span className="text-sm text-gray-600">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Event Modal */}
            <EventModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                selectedDate={selectedDate}
            />
        </Layout>
    );
}