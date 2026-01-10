import React, { useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Link } from '@inertiajs/react';
import MonthView from '@/Components/MonthView';
import WeekView from '@/Components/WeekView';
import DayView from '@/Components/DayView';
import YearView from '@/Components/YearView';
import EventModal from '@/Components/EventModal';
import { ThemedButton } from '@/Components/ThemedComponents';

export default function CalendarView({ calendars = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState('year');
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
        if (viewMode === 'year') {
            newDate.setFullYear(currentDate.getFullYear() + direction);
        } else if (viewMode === 'month') {
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
            case 'note': return 'bg-theme-tertiary0';
            default: return 'bg-theme-tertiary0';
        }
    };

    const getDateTitle = () => {
        if (viewMode === 'year') {
            return currentDate.getFullYear().toString();
        } else if (viewMode === 'month') {
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
                        <h1 className="text-2xl font-bold text-theme-primary">Calendar View</h1>
                        <p className="text-gray-600">Interactive calendar interface</p>
                    </div>
                    <Link href="/calendar">
                        <ThemedButton variant="secondary">Back to List</ThemedButton>
                    </Link>
                </div>

                {/* Calendar Header */}
                <div className="bg-theme-primary rounded-lg shadow p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <ThemedButton
                                variant="ghost"
                                onClick={() => navigateDate(-1)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </ThemedButton>
                            <h2 className="text-xl font-semibold text-theme-primary">
                                {getDateTitle()}
                            </h2>
                            <ThemedButton
                                variant="ghost"
                                onClick={() => navigateDate(1)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </ThemedButton>
                            <ThemedButton
                                variant="primary"
                                onClick={() => setCurrentDate(new Date())}
                                className="px-4 py-2 text-sm"
                            >
                                Today
                            </ThemedButton>
                        </div>
                        
                        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                            {['year', 'month', 'week', 'day'].map(mode => (
                                <ThemedButton
                                    key={mode}
                                    variant={viewMode === mode ? 'primary' : 'ghost'}
                                    onClick={() => setViewMode(mode)}
                                    className="px-4 py-2 text-sm font-medium transition-colors"
                                >
                                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </ThemedButton>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Calendar Content */}
                {viewMode === 'year' && (
                    <YearView 
                        currentDate={currentDate}
                        calendars={calendars}
                        getEventsForDate={getEventsForDate}
                        getTypeColor={getTypeColor}
                        onDateClick={handleDateClick}
                        onMonthClick={(month) => {
                            const newDate = new Date(currentDate.getFullYear(), month, 1);
                            setCurrentDate(newDate);
                            setViewMode('month');
                        }}
                    />
                )}
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
                <div className="bg-theme-primary rounded-lg shadow p-4">
                    <h3 className="text-sm font-medium mb-3 text-theme-primary">Event Types</h3>
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
