import React, { useState } from 'react';

const Calendars = (props) => {
  const {
    selectedCalendarCategories,
    toggleSelectedCalendar,
    calendars,
  } = props;

  const selectedClass = (summary) =>
    selectedCalendarCategories.includes(summary) ? 'card selected' : 'card';

  return (
    <div className="calendars">
      <p>CALENDARS</p>
      <ul>
        {calendars &&
          calendars.map((calendar) => {
            return (
              <li key={calendar.id}>
                <div
                  className={selectedClass(calendar.summary)}
                  onClick={() => toggleSelectedCalendar(calendar.summary)}
                >
                  <div
                    className="calendar-color"
                    style={{
                      backgroundColor: calendar.backgroundColor,
                    }}
                  ></div>
                  {calendar.summary}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Calendars;
