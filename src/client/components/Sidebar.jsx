import React from 'react';

const Sidebar = () => {
  const mock = [{ title: 'Titi' }, { title: 'Tope' }, { title: 'Toyin' }];
  return (
    <div className="calendars">
      <p>CALENDARS</p>
      <ul>
        {mock.map((calendar) => {
          return (
            <li key={calendar.title}>
              <div className="card selected">
                <div className="calendar-color"></div>
                {calendar.title}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
