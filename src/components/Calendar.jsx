import { useState } from 'react';
import DayColumn from './DayColumn';
import { formatDate, addDays } from '../utils/dateUtils';
import '../styles/Calendar.css';

const Calendar = ({ startDate, setStartDate, timeSlots, events, onTimeSlotClick }) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const handlePrevWeek = () => {
        const newStart = new Date(startDate);
        newStart.setDate(newStart.getDate() - 7);
        setStartDate(newStart);
    };

    const handleNextWeek = () => {
        const newStart = new Date(startDate);
        newStart.setDate(newStart.getDate() + 7);
        setStartDate(newStart);
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={handlePrevWeek} className="nav-btn">◀</button>
                <h2>{formatDate(startDate)} - {formatDate(addDays(startDate, 6))}</h2>
                <button onClick={handleNextWeek} className="nav-btn">▶</button>
            </div>

            <div className="calendar-grid">
                <div className="time-column">
                    <div className="day-header"></div>
                    {timeSlots.map((time, index) => (
                        <div key={index} className="time-slot">
                            {time}
                        </div>
                    ))}
                </div>

                {daysOfWeek.map((day, index) => {
                    const currentDate = addDays(startDate, index);
                    const dayEvents = events.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.toDateString() === currentDate.toDateString();
                    });

                    return (
                        <DayColumn
                            key={day}
                            day={day}
                            date={currentDate}
                            timeSlots={timeSlots}
                            events={dayEvents}
                            onTimeSlotClick={(time) => onTimeSlotClick(currentDate, time)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
