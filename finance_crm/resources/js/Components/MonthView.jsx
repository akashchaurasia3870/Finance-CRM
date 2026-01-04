import React from 'react';

export default function MonthView({ currentDate, calendars, getEventsForDate, getTypeColor, onDateClick }) {
    const getMonthDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
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

    const days = getMonthDays();
    const currentMonth = currentDate.getMonth();

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header with day names */}
            <div className="grid grid-cols-7 bg-gray-800 text-white">
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                    <div key={day} className="py-3 px-2 text-center font-semibold text-sm border-r border-gray-600 last:border-r-0">
                        {day}
                    </div>
                ))}
            </div>
            
            {/* Calendar grid - 6 rows */}
            <div className="grid grid-rows-6">
                {Array.from({ length: 6 }, (_, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 border-b border-gray-200 last:border-b-0">
                        {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, dayIndex) => {
                            const events = getEventsForDate(day);
                            const isCurrentMonth = day.getMonth() === currentMonth;
                            const isToday = day.toDateString() === new Date().toDateString();
                            
                            return (
                                <div key={dayIndex} className={`h-28 border-r border-gray-200 last:border-r-0 p-2 relative cursor-pointer ${
                                    isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                                } ${isToday ? 'bg-blue-50' : ''                                } hover:bg-gray-100 transition-colors`}
                                     onClick={() => onDateClick(day)}>
                                    {/* Date number */}
                                    <div className={`text-sm font-medium ${
                                        isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                                    } ${isToday ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}`}>
                                        {day.getDate()}
                                    </div>
                                    
                                    {/* Events */}
                                    <div className="mt-1 space-y-0.5">
                                        {events.slice(0, 3).map(event => (
                                            <div key={event.id} 
                                                 className={`text-xs px-1.5 py-0.5 rounded text-white truncate cursor-pointer ${getTypeColor(event.type)}`}
                                                 title={`${event.title} - ${new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}>
                                                {event.title}
                                            </div>
                                        ))}
                                        {events.length > 3 && (
                                            <div className="text-xs text-gray-500 font-medium">
                                                +{events.length - 3} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}