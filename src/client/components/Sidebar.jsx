import React, { useState } from 'react';

const Sidebar = (props) => {
  const [toggleSelected, setToggleSelected] = useState(false);

  // const handleCalendarSelection = (toggleSelected) =>
  //   setToggleSelected(!toggleSelected);

  return (
    <div className="calendars">
      <p>CALENDARS</p>
      <ul>
        {props.calendars.map((calendar) => {
          return (
            <li key={calendar.id}>
              <div
                className={toggleSelected ? 'card selected' : 'card'}
                onClick={() => {
                  setToggleSelected(!toggleSelected);
                }}
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
