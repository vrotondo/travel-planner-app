export const exportToExcel = (events, activities, restaurants, startDate) => {
    // Dynamic import to avoid issues with SSR or module loading
    import('xlsx').then(XLSX => {
        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Format events data for Excel
        const eventsData = events.map(event => ({
            'Date': new Date(event.date).toLocaleDateString(),
            'Title': event.title,
            'Type': event.type.charAt(0).toUpperCase() + event.type.slice(1),
            'Start Time': new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            'End Time': new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            'Duration (min)': event.duration,
            'Description': event.description
        }));

        // Format activities data for Excel
        const activitiesData = activities.map(activity => ({
            'Activity': activity.name,
            'Completed': activity.completed ? 'Yes' : 'No'
        }));

        // Format restaurants data for Excel
        const restaurantsData = restaurants.map(restaurant => ({
            'Restaurant': restaurant.name,
            'Visited': restaurant.visited ? 'Yes' : 'No'
        }));

        // Create worksheets
        const eventsSheet = XLSX.utils.json_to_sheet(eventsData);
        const activitiesSheet = XLSX.utils.json_to_sheet(activitiesData);
        const restaurantsSheet = XLSX.utils.json_to_sheet(restaurantsData);

        // Add the worksheets to the workbook
        XLSX.utils.book_append_sheet(wb, eventsSheet, 'Schedule');
        XLSX.utils.book_append_sheet(wb, activitiesSheet, 'Activities');
        XLSX.utils.book_append_sheet(wb, restaurantsSheet, 'Restaurants');

        // Format start date for filename
        const dateStr = startDate.toISOString().split('T')[0];

        // Write the workbook and trigger download
        XLSX.writeFile(wb, `Travel_Plan_${dateStr}.xlsx`);
    });
};