import { useState } from 'react';

const ActivityList = ({ activities, restaurants, onAddActivity, onAddRestaurant }) => {
    const [newActivity, setNewActivity] = useState('');
    const [newRestaurant, setNewRestaurant] = useState('');
    const [activeTab, setActiveTab] = useState('activities');

    const handleAddActivity = (e) => {
        e.preventDefault();
        if (newActivity.trim()) {
            onAddActivity({ name: newActivity.trim(), completed: false });
            setNewActivity('');
        }
    };

    const handleAddRestaurant = (e) => {
        e.preventDefault();
        if (newRestaurant.trim()) {
            onAddRestaurant({ name: newRestaurant.trim(), visited: false });
            setNewRestaurant('');
        }
    };

    return (
        <div className="activity-list">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'activities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('activities')}
                >
                    Activities
                </button>
                <button
                    className={`tab ${activeTab === 'restaurants' ? 'active' : ''}`}
                    onClick={() => setActiveTab('restaurants')}
                >
                    Restaurants
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'activities' && (
                    <div>
                        <h3>Activities To Do</h3>
                        <form onSubmit={handleAddActivity} className="add-form">
                            <input
                                type="text"
                                value={newActivity}
                                onChange={(e) => setNewActivity(e.target.value)}
                                placeholder="Add new activity..."
                            />
                            <button type="submit">Add</button>
                        </form>
                        <ul className="item-list">
                            {activities.map((activity) => (
                                <li key={activity.id} className={activity.completed ? 'completed' : ''}>
                                    <input
                                        type="checkbox"
                                        checked={activity.completed}
                                        onChange={() => {
                                            // Create a new activity object with toggled completion status
                                            const updatedActivity = { ...activity, completed: !activity.completed };
                                            // Create a new activities array with the updated activity
                                            const updatedActivities = activities.map(a =>
                                                a.id === activity.id ? updatedActivity : a
                                            );
                                            // Update the state with the new array
                                            onAddActivity(updatedActivity);
                                        }}
                                    />
                                    <span>{activity.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'restaurants' && (
                    <div>
                        <h3>Restaurants To Visit</h3>
                        <form onSubmit={handleAddRestaurant} className="add-form">
                            <input
                                type="text"
                                value={newRestaurant}
                                onChange={(e) => setNewRestaurant(e.target.value)}
                                placeholder="Add new restaurant..."
                            />
                            <button type="submit">Add</button>
                        </form>
                        <ul className="item-list">
                            {restaurants.map((restaurant) => (
                                <li key={restaurant.id} className={restaurant.visited ? 'visited' : ''}>
                                    <input
                                        type="checkbox"
                                        checked={restaurant.visited}
                                        onChange={() => {
                                            const updatedRestaurants = restaurants.map(r =>
                                                r.id === restaurant.id ? { ...r, visited: !r.visited } : r
                                            );
                                            onAddRestaurant({ ...restaurant, visited: !restaurant.visited });
                                        }}
                                    />
                                    <span>{restaurant.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityList;