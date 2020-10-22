import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import mock from '../mock.json';
import '../calendar.scss';

const Layout = () => {
  // const [calendars, setCalendars] = useState({})
  const { calendars, calenderEvents } = mock;
  const { events } = calenderEvents;
  const selectedEvents = events;
  // const selectedCalendarIds = ['calendarId'];

  return (
    <div className="container">
      <Header />
      <div className="page-layout">
        <Sidebar calendars={calendars.items} />
        <Content selectedEvents={selectedEvents} />
      </div>
    </div>
  );
};

const App = () => {
  return <Layout />;
};

export default App;
