import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import ActivityList from './components/ActivityList';
import { generateTimeSlots, getStartOfWeek } from './utils/dateUtils';
import { exportToExcel } from './utils/exportUtils';
import './styles/App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startDate, setStartDate] = useState(getStartOfWeek(selectedDate));
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [activities, setActivities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const timeSlots = generateTimeSlots();

  const handleTimeSlotClick = (day, time) => {
    setSelectedTimeSlot({ day, time });
    setShowEventForm(true);
  };

  const handleAddEvent = (event) => {
    setEvents([...events, { ...event, id: Date.now() }]);
    setShowEventForm(false);
  };

  const handleAddActivity = (activity) => {
    // If the activity has an id, it's an update to an existing activity
    if (activity.id) {
      setActivities(activities.map(a => a.id === activity.id ? activity : a));
    } else {
      // Otherwise it's a new activity
      setActivities([...activities, { ...activity, id: Date.now() }]);
    }
  };

  const handleAddRestaurant = (restaurant) => {
    // If the restaurant has an id, it's an update to an existing restaurant
    if (restaurant.id) {
      setRestaurants(restaurants.map(r => r.id === restaurant.id ? restaurant : r));
    } else {
      // Otherwise it's a new restaurant
      setRestaurants([...restaurants, { ...restaurant, id: Date.now() }]);
    }
  };

  const handleExport = () => {
    exportToExcel(events, activities, restaurants, startDate);
  };

  return (
    <div className="app">
      <header>
        <h1>Travel Planner</h1>
        <button onClick={handleExport} className="export-btn">Export to Excel</button>
      </header>

      <main>
        <div className="calendar-container">
          <Calendar
            startDate={startDate}
            setStartDate={setStartDate}
            timeSlots={timeSlots}
            events={events}
            onTimeSlotClick={handleTimeSlotClick}
          />
        </div>

        <div className="sidebar">
          <ActivityList
            activities={activities}
            restaurants={restaurants}
            onAddActivity={handleAddActivity}
            onAddRestaurant={handleAddRestaurant}
          />
        </div>
      </main>

      {showEventForm && (
        <div className="modal-overlay">
          <EventForm
            selectedTimeSlot={selectedTimeSlot}
            startDate={startDate}
            onSave={handleAddEvent}
            onCancel={() => setShowEventForm(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;