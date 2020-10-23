import React from 'react';
import {
  getDateToday,
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
    range(-1, 24, 1).map((x) => {
      let time = null;
      if (x == -1) {
        time = '';
      } else if (x === 0) {
        time = '12 AM';
      } else if (x < 12) {
        time = `${x} AM`;
      } else {
        time = `${x - 12} PM`;
      }
      return (
        <div className="time" key={x}>
          {time}
        </div>
      );
    });

  const getHeightOfEvent = (startTime, endTime) => {
    const height = getDifferenceInMinutes(endTime, startTime);
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
        return (
          <div className="timeslot" key={hour}>
            {currentDayEvents.map((event, i) => {
              let { summary, start, end, backgroundColor } = event;
              let startDate = start.dateTime;
              // || start.date;
              const endDate = end.dateTime;
              // || end.date ;
              let eventHeight = getHeightOfEvent(startDate, endDate);
              let startPosition = (getTheMinutes(startDate) / 60) * 100;
              let width = (1 / currentDayEvents.length) * 90;
              let display = width !== 100 ? 'inline' : 'block';
              return (
                <div
                  key={i}
                  style={{
                    height: eventHeight,
                    display,
                    position: 'absolute',
                    width: width + '%',
                    top: startPosition,
                    left: i * width + '%',
                    backgroundColor: backgroundColor,
                    color: 'white',
                    zIndex: 99,
                    borderRadius: '5px',
                  }}
                >
                  {summary + ' time=='}
                </div>
              );
            })}
          </div>
        );
      }

      return (
        <div className="timeslot" key={hour}>
          {' '}
          what?
        </div>
      );
    });
  };

  const currentDate = (i) => {
    if (getDay(getWeek[i]) === getDateToday()) {
      return <div className="active">{getDay(getWeek[i])}</div>;
    }
    return <div>{getDay(getWeek[i])}</div>;
  };

  return (
    <div className="calendar">
      <div className="layout">
        <div>{timeConverter()}</div>
        <div className="weekdays">
          {weekdays.map((weekday, i) => {
            return (
              <div className="weekday" key={weekday}>
                <div className="timeslot" key={weekday}>
                  {currentDate(i)}
                  <div> {weekday}</div>
                </div>
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
