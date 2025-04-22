# Travel Planner App

Travel planner app built with React and Vite that helps you organize your trips.

## Key Features

- A weekly calendar layout with days from Sunday to Sunday
- Time slots in 30-minute increments from 8:00 AM to 11:30 PM
- Ability to add different types of events (check-ins, travel times, tours, RSVPs, etc.)
- Color-coded events by category
- Event duration options (30 min, 1 hour, 1.5 hours, 2 hours, etc.)
- A sidebar for managing activities and restaurants lists
- Export functionality to download all data as an Excel spreadsheet

## Code Structure

The code is organized into several components:

- Main App container
- Calendar with day columns
- Event management (form and display)
- Activity and restaurant lists
- Utility functions for dates and Excel export

## How to Use

1. Navigate through weeks using the arrow buttons
2. Click on any time slot to add a new event
3. Fill in event details (title, description, type, duration)
4. Add activities and restaurants in the sidebar
5. Export your entire trip plan to Excel with the "Export to Excel" button

## Development

This project uses React with Vite for fast development. Two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev