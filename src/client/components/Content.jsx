import React from 'react';
import { getWeekDates, getDay } from '../date.js';

const Content = (props) => {
  const { selectedEvents } = props;

  const getWeek = getWeekDates();
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
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
      <div className="timeslot events" key={hour}>
        {hour}
      </div>
    ));
  };

  // const displayEvent = () => {
  //   console.log('ttt', selectedEvents);
  //   return selectedEvents.map((event) => {
  //     const { summary, start, end } = event;
  //     const startDate = start.date || start.dateTime;
  //     const endDate = end.date || end.dateTime;

  //     const dates = getWeekDates.map(date => {

  //     })
  //     <div>{summary + startDate + endDate}</div>;
  //   });
  // };

  return (
    <div className="calendar">
      <div className="weekdays with-text">
        {getWeek.map((weekday, i) => {
          return (
            <div className="weekday" key={weekday}>
              {getDay(weekday)} {weekdays[i]}
            </div>
          );
        })}
      </div>
      <div className="layout">
        <div className="timeslots">{time()}</div>
        <div className="weekdays without-text">
          {weekdays.map((weekday) => {
            return (
              <div className="weekday" key={weekday}>
                <div className="timeslots">{time()}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
