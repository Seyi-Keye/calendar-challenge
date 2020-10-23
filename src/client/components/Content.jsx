import React from 'react';
import {
  getDay,
  getDifferenceInMinutes,
  getTheMinutes,
  getWeekDates,
  isSameDay,
  isSameHour,
} from '../date.js';

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

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  const timeConverter = () =>
    range(0, 24, 1).map((x) => {
      let time = null;
      if (x === 0) {
        time = '12 AM';
      } else if (x < 12) {
        time = `${x} AM`;
      } else {
        time = `${x - 12} PM`;
      }
      return (
        <div className="timeslot events" key={x}>
          {time}
        </div>
      );
    });

  const getHeightOfEvent = (startTime, endTime) => {
    const height = getDifferenceInMinutes(startTime, endTime);
    return (height / 60) * 100;
  };

  /** */
  const eventConverter = (events, currentDay) => {
    return range(0, 24, 1).map((hour) => {
      let currentDayEvents = events.filter((event) => {
        let { start, end } = event;
        let startDate = start.dateTime;
        // || start.date;
        const endDate = end.dateTime;
        // || end.date ;
        return isSameHour(startDate, hour) && isSameDay(endDate, currentDay);
      });

      if (currentDayEvents.length) {
        return currentDayEvents.map((event, i) => {
          let { summary, start, end } = event;
          let startDate = start.dateTime;
          // || start.date;
          const endDate = end.dateTime;
          // || end.date ;
          let eventHeight = getHeightOfEvent(startDate, endDate);
          let startPosition = (getTheMinutes(startDate) / 60) * 100;
          return (
            <div className="timeslot events" key={i}>
              <div
                style={{
                  height: eventHeight + 'px',
                  position: 'absolute',
                  width: '100%',
                  top: startPosition,
                  backgroundColor: 'blue',
                  color: 'white',
                }}
              >
                {summary + ' time=='}
              </div>
            </div>
          );
        });
      }

      return (
        <div className="timeslot events" key={hour}>
          {' '}
          what?
        </div>
      );
    });
  };

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
        <div>{timeConverter()}</div>
        <div className="weekdays">
          {weekdays.map((weekday, i) => {
            return (
              <div className="weekday" key={weekday}>
                <div>{eventConverter(selectedEvents, getWeek[i])}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Content;
