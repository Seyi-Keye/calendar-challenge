import React, { useState } from 'react';

const Sidebar = (props) => {
  const { selectedCalendarCategories, toggleSelectedCalendar } = props;

  const selectedClass = (summary) =>
    selectedCalendarCategories.includes(summary) ? 'card selected' : 'card';

  return (
    <div className="calendars">
      <p>CALENDARS</p>
      <ul>
        {props.calendars.map((calendar) => {
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

export default Sidebar;
