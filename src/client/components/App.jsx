import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Calendars from './Calendars';
import CalendarEvents from './CalendarEvents';
import GoogleAuthCalendar from './GoogleAuthCalendar';
import '../calendar.scss';

export const CalendarView = (props) => {
  const { calendars, categories, events, setCalendars, setCategories, setEvents } = props;

  const toggleSelectedCalendar = (summary) => {
    return categories.includes(summary)
      ? setCategories(categories.filter((category) => category !== summary))
      : setCategories([...categories, summary]);
  };

  return (
    <div className="container">
      <Navigation setCalendars={setCalendars} setEvents={setEvents} setCategories={setCategories} />
      <div className="page-layout">
        <Calendars
          calendars={calendars}
          selectedCalendarCategories={categories}
          toggleSelectedCalendar={toggleSelectedCalendar}
        />
        <CalendarEvents selectedEvents={events} selectedCalendarCategories={categories} />
      </div>
    </div>
  );
};

CalendarView.propTypes = {
  calendars: PropTypes.array,
  categories: PropTypes.array,
  events: PropTypes.array,
  setCategories: PropTypes.func,
};

const App = () => {
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <div>
      {isSignedIn ? (
        <CalendarView
          calendars={calendars}
          categories={categories}
          events={events}
          setCalendars={setCalendars}
          setCategories={setCategories}
          setEvents={setEvents}
        />
      ) : (
        <GoogleAuthCalendar
          setCalendars={setCalendars}
          setEvents={setEvents}
          setCategories={setCategories}
          setIsSignedIn={setIsSignedIn}
          isSignedIn={isSignedIn}
        />
      )}
    </div>
  );
};

export default App;
