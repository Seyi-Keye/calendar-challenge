import React from 'react';

const Sidebar = () => {
  const mock = [{ title: 'Titi' }, { title: 'Tope' }];
  return (
    <div className="calendars">
      <p>Calendars</p>
      <ul>
        {mock.map((calendar) => {
          return (
            <li key={calendar.title}>
              <div className="card">{calendar.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
