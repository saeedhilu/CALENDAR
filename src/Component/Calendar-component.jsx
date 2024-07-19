import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import "react-calendar/dist/Calendar.css";

export const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [eventDetails, setEventDetails] = useState("");
  const [events, setEvents] = useState({});

  const handleDateChange = (date) => setDate(date);
  const eventChangeHandler = (event) => setEventDetails(event.target.value);

  const eventDetailsHandling = () => {
    const newEvents = { ...events };
    const dateKey = date.toDateString();

    if (!newEvents[dateKey]) {
      newEvents[dateKey] = [];
    }

    newEvents[dateKey].push(eventDetails);
    setEvents(newEvents);
    setEventDetails("");
  };

  const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    }
    return false;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today ? 'react-calendar__tile--disabled' : '';
    }
    return '';
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month' && events[date.toDateString()]) {
      return <div className="event-dot"></div>;
    }
  };
  

  const eventsForSelectedDate = events[date.toDateString()] || [];

  return (
    <div className="container">
      <div className="inner-container">
        <h2>Add Event</h2>
        <div className="input-container">
          <input
            className="input"
            type="text"
            placeholder="Enter your event"
            value={eventDetails}
            onChange={eventChangeHandler}
          />
          <button onClick={eventDetailsHandling}>Add</button>
        </div>
        <Calendar
          value={date}
          onChange={handleDateChange}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </div>

      <div className="event-list">
        <h3>Events Available for {date.toDateString()}</h3>
        {eventsForSelectedDate.length === 0 ? (
          <p style={{ color: 'red' }}>No events for this date</p>
        ) : (
          eventsForSelectedDate.map((event, index) => (
            <div key={index} className="event-box">
              <p>{event}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
