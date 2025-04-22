import { useState } from 'react';

const EventForm = ({ selectedTimeSlot, startDate, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('activity'); // activity, check-in, travel, tour, rsvp
    const [duration, setDuration] = useState(30); // in minutes

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            // Parse the selected time
            let timeString = selectedTimeSlot.time;
            let [hour, minute] = [0, 0];

            // Make parsing more robust
            if (timeString) {
                const timeParts = timeString.replace('AM', '').replace('PM', '').trim().split(':');
                hour = parseInt(timeParts[0], 10);
                minute = timeParts.length > 1 ? parseInt(timeParts[1], 10) : 0;

                // Adjust for PM and 12-hour time format
                if (timeString.includes('PM') && hour !== 12) {
                    hour += 12;
                } else if (timeString.includes('AM') && hour === 12) {
                    hour = 0; // 12 AM is 0 in 24-hour format
                }
            }

            // Make sure day is a Date object
            const day = selectedTimeSlot.day instanceof Date ?
                selectedTimeSlot.day :
                new Date(selectedTimeSlot.day);

            // Create a date object for the start time
            const startTime = new Date(day);
            startTime.setHours(hour, minute, 0, 0);

            // Create a date object for the end time
            const endTime = new Date(startTime);
            endTime.setMinutes(endTime.getMinutes() + parseInt(duration, 10));

            onSave({
                title,
                description,
                type,
                date: day,
                startTime,
                endTime,
                duration
            });
        } catch (error) {
            console.error('Error creating event:', error);
            alert('There was a problem creating the event. Please try again.');
        }
    };

    return (
        <div className="event-form">
            <h3>Add New Event</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="activity">Activity</option>
                        <option value="check-in">Check-in/Check-out</option>
                        <option value="travel">Travel</option>
                        <option value="tour">Tour</option>
                        <option value="rsvp">RSVP</option>
                        <option value="meal">Meal</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Duration (minutes)</label>
                    <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1.5 hours</option>
                        <option value="120">2 hours</option>
                        <option value="180">3 hours</option>
                        <option value="240">4 hours</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
                    <button type="submit" className="save-btn">Save</button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;