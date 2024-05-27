import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import "react-calendar/dist/Calendar.css";

export const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [eventDetails, setEventDetails] = useState("");

  const handleDateChange = (date) => setDate(date);
  const eventChangeHandler = (event) => setEventDetails(event.target.value);

  const eventDetailsHandling = () => {
    const today = new Date()
    if (today>date){
      alert("You can't add event for past date")
    }
    const newEvents = { ...events };
    if (!newEvents[date.toDateString()]) {
      newEvents[date.toDateString()] = [];
    }

    newEvents[date.toDateString()].push(eventDetails);
    setEvents(newEvents);
    setEventDetails("");
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
        <Calendar value={date} onChange={handleDateChange} />
      </div>

      <div className="event-list">
        <h3>Events for {date.toDateString()}</h3>
        {eventsForSelectedDate.length === 0 ? (
          <p style={{
            color:'red',
            
          }}>No events for this date</p>
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
