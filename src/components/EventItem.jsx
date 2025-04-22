const EventItem = ({ event }) => {
    const getEventTypeColor = (type) => {
        switch (type) {
            case 'activity': return '#4CAF50'; // Green
            case 'check-in': return '#2196F3'; // Blue
            case 'travel': return '#FF9800'; // Orange
            case 'tour': return '#9C27B0'; // Purple
            case 'rsvp': return '#F44336'; // Red
            case 'meal': return '#795548'; // Brown
            default: return '#607D8B'; // Blue-grey
        }
    };

    const eventStyle = {
        backgroundColor: getEventTypeColor(event.type),
    };

    return (
        <div className="event-item" style={eventStyle}>
            <div className="event-title">{event.title}</div>
            <div className="event-time">
                {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                -
                {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default EventItem;
