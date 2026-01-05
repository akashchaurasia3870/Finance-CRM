import React from 'react';

export default function DayView({ currentDate, calendars, getEventsForDate, getTypeColor, onDateClick }) {
    const events = getEventsForDate(currentDate);
    const isToday = currentDate.toDateString() === new Date().toDateString();

    return (
        <div className="bg-theme-primary shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className={`py-4 px-6 text-center ${isToday ? 'bg-blue-600 text-white' : 'bg-gray-800 text-white'}`}>
                <div className="text-sm font-medium">
                    {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div className="text-2xl font-bold mt-1">
                    {currentDate.getDate()}
                </div>
                <div className="text-sm opacity-90">
                    {currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </div>
            </div>

            {/* Day content */}
            <div className="p-6 cursor-pointer" onClick={() => onDateClick(currentDate)}>
                {events.length > 0 ? (
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-theme-primary mb-4">
                            {events.length} Event{events.length !== 1 ? 's' : ''} Today
                        </h3>
                        {events.map(event => (
                            <div key={event.id} className={`p-4 rounded-lg text-white ${getTypeColor(event.type)}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-lg">{event.title}</h4>
                                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                                        {event.type.toUpperCase()}
                                    </span>
                                </div>
                                <div className="text-sm opacity-90 mb-2">
                                    {new Date(event.start_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                    {new Date(event.end_datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                {event.description && (
                                    <p className="text-sm opacity-90 mt-2">{event.description}</p>
                                )}
                                {event.location && (
                                    <div className="text-sm opacity-90 mt-2">
                                        📍 {event.location}
                                    </div>
                                )}
                                {event.meeting_link && (
                                    <div className="text-sm opacity-90 mt-2">
                                        🔗 <a href={event.meeting_link} target="_blank" rel="noopener noreferrer" className="underline">
                                            Join Meeting
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📅</div>
                        <h3 className="text-lg font-medium text-theme-primary mb-2">No events scheduled</h3>
                        <p className="text-theme-muted">Enjoy your free day!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
