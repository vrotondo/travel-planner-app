import { formatDate } from '../utils/dateUtils';
import EventItem from './EventItem';

const DayColumn = ({ day, date, timeSlots, events, onTimeSlotClick }) => {
    // Function to determine if a time slot has an event
    const getEventForTimeSlot = (time) => {
        return events.find(event => {
            const eventStart = new Date(event.startTime);
            const eventStartHour = eventStart.getHours();
            const eventStartMinute = eventStart.getMinutes();

            const [timeHour, timeMinute] = time.replace('AM', '').replace('PM', '').trim().split(':').map(Number);
            const adjustedTimeHour = time.includes('PM') && timeHour !== 12 ? timeHour + 12 : timeHour;

            return eventStartHour === adjustedTimeHour && eventStartMinute === (timeMinute || 0);
        });
    };

    return (
        <div className="day-column">
            <div className="day-header">
                <div>{day}</div>
                <div className="date">{formatDate(date, { day: 'numeric', month: 'numeric' })}</div>
            </div>

            {timeSlots.map((time, index) => {
                const event = getEventForTimeSlot(time);

                return (
                    <div
                        key={index}
                        className={`time-slot ${event ? 'has-event' : ''}`}
                        onClick={() => !event && onTimeSlotClick(time)}
                    >
                        {event ? <EventItem event={event} /> : ''}
                    </div>
                );
            })}
        </div>
    );
};

export default DayColumn;