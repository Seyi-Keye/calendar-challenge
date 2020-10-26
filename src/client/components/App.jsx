import React, { useEffect, useState } from 'react';
import CalendarHeader from './CalendarHeader';
import Calendars from './Calendars';
import CalendarEvents from './CalendarEvents';
import GoogleAuthCalendar from './GoogleAuthCalendar';
import '../calendar.scss';

export const CalendarView = (props) => {
  const { calendars, categories, events, setCategories } = props;

  const toggleSelectedCalendar = (summary) => {
    return categories.includes(summary)
      ? setCategories(categories.filter((category) => category !== summary))
      : setCategories([...categories, summary]);
  };

  return (
    <div className="container">
      <CalendarHeader />
      <div className="page-layout">
        <Calendars
          calendars={calendars}
          selectedCalendarCategories={categories}
          toggleSelectedCalendar={toggleSelectedCalendar}
        />
        <CalendarEvents
          selectedEvents={events}
          selectedCalendarCategories={categories}
        />
      </div>
    </div>
  );
};

const App = () => {
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   setCalendarApiResponse(handleClientLoad());

  //   return () => setCalendarApiResponse(null);
  // }, [calendarApiResponse]);

  return (
    <div>
      <GoogleAuthCalendar
        setCalendars={setCalendars}
        setEvents={setEvents}
        setCategories={setCategories}
      />
      {calendars && (
        <CalendarView
          calendars={calendars}
          events={events}
          categories={categories}
          setCategories={setCategories}
        />
      )}
      ;
    </div>
  );
};

export default App;
