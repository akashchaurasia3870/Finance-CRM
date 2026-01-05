import React from 'react';

export default function WeekView({ currentDate, calendars, getEventsForDate, getTypeColor, onDateClick }) {
    const getWeekDays = () => {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
        return days;
    };

    const days = getWeekDays();

    return (
        <div className="bg-theme-primary shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-7 bg-gray-800 text-white">
                {days.map((day, index) => {
                    const isToday = day.toDateString() === new Date().toDateString();
                    return (
                        <div key={index} className="py-3 px-2 text-center border-r border-gray-600 last:border-r-0">
                            <div className="font-semibold text-sm">
                                {day.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className={`text-lg font-bold mt-1 ${isToday ? 'bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mx-auto' : ''}`}>
                                {day.getDate()}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Week grid */}
            <div className="grid grid-cols-7 min-h-96">
                {days.map((day, index) => {
                    const events = getEventsForDate(day);
                    const isToday = day.toDateString() === new Date().toDateString();
                    
                    return (
                        <div key={index} className={`p-3 border-r border-gray-200 last:border-r-0 cursor-pointer ${
                            isToday ? 'bg-blue-50' : 'bg-theme-primary'
                        } hover:bg-theme-tertiary transition-colors`}
                             onClick={() => onDateClick(day)}>
                            <div className="space-y-2">
                                {events.map(event => (
                                    <div key={event.id} className={`p-2 rounded text-white text-sm ${getTypeColor(event.type)}`}>
                                        <div className="font-medium">{event.title}</div>
                                        <div className="text-xs opacity-90">
                                            {new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                            {new Date(event.end_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
