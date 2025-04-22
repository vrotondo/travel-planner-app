export const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 24; hour++) {
        const isPM = hour >= 12;
        const displayHour = hour > 12 ? hour - 12 : hour;
        slots.push(`${displayHour}:00 ${isPM ? 'PM' : 'AM'}`);
        slots.push(`${displayHour}:30 ${isPM ? 'PM' : 'AM'}`);
    }
    return slots;
};

export const getStartOfWeek = (date) => {
    const result = new Date(date);
    const day = date.getDay();
    result.setDate(result.getDate() - day);
    return result;
};

export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
};

export const formatDate = (date, options = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    return date.toLocaleDateString('en-US', options);
};
