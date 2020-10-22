import React from 'react';

const Content = () => {
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friiday',
    'Saturday',
  ];

  const time = () => {
    const hours = ['12AM'];
    for (let i = 1; i < 12; i++) {
      hours.push(i + 'AM');
    }

    hours.push('12PM');
    for (let i = 1; i < 12; i++) {
      hours.push(i + 'PM');
    }
    return hours.map((hour) => (
      <div className="timeslot" key={hour}>
        {hour}
      </div>
    ));
  };
  return (
    <div className="calendar">
      {/* <div className="weekdays with-text">
        {weekdays.map((weekday) => {
          return (
            <div className="weekday" key={weekday}>
              {weekday}
            </div>
          );
        })}
      </div> */}
      <div className="layout">
        <div className="timeslots">{time()}</div>
        <div className="weekdays">
          {weekdays.map((weekday) => {
            return (
              <div className="weekday" key={weekday}>
                {weekday}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
