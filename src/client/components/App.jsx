import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import mock from '../mock.json';
import '../calendar.scss';

const Layout = () => {
  const [selectedCalendarCategories, setSelectedCalendarCategories] = useState([
    'aromokeyes2@gmail.com',
    'Christian Holidays',
  ]);
  const { calendars, calenderEvents } = mock;
  const { events } = calenderEvents;
  const selectedEvents = events;

  const toggleSelectedCalendar = (summary) => {
    return selectedCalendarCategories.includes(summary)
      ? setSelectedCalendarCategories(
          selectedCalendarCategories.filter((category) => category !== summary)
        )
      : setSelectedCalendarCategories([...selectedCalendarCategories, summary]);
  };

  return (
    <div className="container">
      <Header />
      <div className="page-layout">
        <Sidebar
          calendars={calendars.items}
          selectedCalendarCategories={selectedCalendarCategories}
          toggleSelectedCalendar={toggleSelectedCalendar}
        />
        <Content
          selectedEvents={selectedEvents}
          selectedCalendarCategories={selectedCalendarCategories}
        />
      </div>
    </div>
  );
};

const App = () => {
  return <Layout />;
};

export default App;
