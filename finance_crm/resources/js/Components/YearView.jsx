import React, { useState } from 'react';
import { ThemedCard, ThemedButton } from '@/Components/ThemedComponents';

export default function YearView({ currentDate, calendars, getEventsForDate, getTypeColor, onDateClick, onMonthClick }) {
    const [hoveredDate, setHoveredDate] = useState(null);
    const currentYear = currentDate.getFullYear();
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getMonthDays = (monthIndex) => {
        const firstDay = new Date(currentYear, monthIndex, 1);
        const lastDay = new Date(currentYear, monthIndex + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const days = [];
        const current = new Date(startDate);
        
        for (let i = 0; i < 42; i++) {
            days.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        
        return days;
    };

    const handleDateHover = (date, events) => {
        if (events.length > 0) {
            setHoveredDate({ date, events });
        }
    };

    const handleDateLeave = () => {
        setHoveredDate(null);
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-3 gap-6">
                {months.map((monthName, monthIndex) => {
                    const days = getMonthDays(monthIndex);
                    const isCurrentMonth = currentYear === today.getFullYear() && monthIndex === currentMonth;
                    
                    return (
                        <ThemedCard key={monthIndex} className={`shadow-md overflow-hidden border-2 ${
                            isCurrentMonth ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                        }`}>
                            {/* Month Header */}
                            <ThemedButton
                                variant={isCurrentMonth ? 'primary' : 'secondary'}
                                className="w-full p-3 text-center font-semibold rounded-none"
                                onClick={() => onMonthClick(monthIndex)}
                            >
                                {monthName}
                            </ThemedButton>
                            
                            {/* Day Headers */}
                            <div className="grid grid-cols-7 bg-gray-100 text-xs">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                    <div key={index} className="p-1 text-center font-medium text-gray-600">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Calendar Grid */}
                            <div className="grid grid-rows-6">
                                {Array.from({ length: 6 }, (_, weekIndex) => (
                                    <div key={weekIndex} className="grid grid-cols-7">
                                        {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                                            const events = getEventsForDate(day);
                                            const isCurrentMonthDay = day.getMonth() === monthIndex;
                                            const isToday = day.toDateString() === today.toDateString();
                                            const hasEvents = events.length > 0;
                                            
                                            return (
                                                <div 
                                                    key={dayIndex} 
                                                    className={`h-8 border-r border-b border-gray-200 last:border-r-0 p-1 text-xs cursor-pointer relative transition-all ${
                                                        isCurrentMonthDay ? 'bg-white hover:bg-blue-50' : 'bg-gray-50 text-gray-400'
                                                    } ${isToday ? 'bg-blue-100 font-bold' : ''} ${
                                                        hasEvents ? 'ring-1 ring-blue-300' : ''
                                                    }`}
                                                    onClick={() => onDateClick(day)}
                                                    onMouseEnter={() => handleDateHover(day, events)}
                                                    onMouseLeave={handleDateLeave}
                                                >
                                                    <div className={`text-center ${
                                                        isToday ? 'bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto text-xs' : ''
                                                    }`}>
                                                        {day.getDate()}
                                                    </div>
                                                    
                                                    {/* Event Indicator */}
                                                    {hasEvents && (
                                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                                                            {events.slice(0, 3).map((event, index) => (
                                                                <div 
                                                                    key={index}
                                                                    className={`w-1 h-1 rounded-full ${getTypeColor(event.type)}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </ThemedCard>
                    );
                })}
            </div>

            {/* Hover Tooltip */}
            {hoveredDate && (
                <div className="fixed z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg max-w-xs pointer-events-none"
                     style={{
                         left: '50%',
                         top: '50%',
                         transform: 'translate(-50%, -50%)'
                     }}>
                    <div className="font-semibold mb-2">
                        {hoveredDate.date.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                    </div>
                    <div className="space-y-1">
                        {hoveredDate.events.map((event, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded ${getTypeColor(event.type)}`}></div>
                                <span className="text-sm">{event.title}</span>
                                <span className="text-xs text-gray-300">
                                    {new Date(event.start_datetime).toLocaleTimeString('en-US', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}