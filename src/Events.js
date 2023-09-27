// Events.js

import React, { useEffect, useState } from 'react';
import EventCard from './components/EventCard';
import './styles/Events.scss';

const Events = () => {
    const [eventsData, setEventData] = useState([]);
    const [cityFilter, setCityFilter] = useState('');
    const [monthFilter, setMonthFilter] = useState('');
  
    useEffect(() => {
      // Fetch the data from the remote JSON file
      fetch('https://raw.githubusercontent.com/xsolla/test-task-frontend/master/events.json')
        .then((response) => response.json())
        .then((data) => setEventData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    // Get unique cities and months from the event data
    const uniqueCities = [...new Set(eventsData.map((event) => event.city))];
    const uniqueMonths = [...new Set(eventsData.map((event) => parseInt(event.date.split('.')[1], 10)))];
  
    const filteredEvents = eventsData.filter((event) => {
      const eventDateParts = event.date.split('.');
      const eventMonth = parseInt(eventDateParts[1], 10);
  
      return (
        (cityFilter === '' || event.city === cityFilter) &&
        (monthFilter === '' || eventMonth === parseInt(monthFilter, 10))
      );
    });
  
    return (
      <div className="events">
        <h2 className="events-title">Event Listing</h2>
        <div className="filters">
          <label>
            City:
            <select onChange={(e) => setCityFilter(e.target.value)} value={cityFilter}>
              <option value="">All</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label>
            Month:
            <select onChange={(e) => setMonthFilter(e.target.value)} value={monthFilter}>
              <option value="">All</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month}>
                  {new Date(0, month - 1).toLocaleString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="event-list">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    );
  }
  
  export default Events;
  