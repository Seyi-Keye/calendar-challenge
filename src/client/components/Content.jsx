import React from 'react';
import { getWeekDates, getDay } from '../date.js';
import { getHours, differenceInMinutes, getMinutes } from 'date-fns';
import mock from '../mock.json';

const Content = (props) => {
  const { selectedEvents } = props;

  const getWeek = getWeekDates();
  // con;
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
    const height = differenceInMinutes(new Date(startTime), new Date(endTime));
    return (height / 60) * 100;
  };
  const eventConverter = (events, day, arrayOfSelected) => {
    // getStartHours = events.map(event => getHours(x.startTime))
    return range(0, 24, 1).map((x) => {
      // if(getStartHours.includes(x)) {
      let y = getHours;
      let currentEvents = events.filter(
        (event) =>
          getHours(new Date(event.start.dateTime)) === x &&
          getDay(new Date(event.start.dateTime)) === getDay(new Date(day))
      );
      if (currentEvents.length) {
        // console.log('do we even get here?', event);
        return currentEvents.map((event) => {
          let eventHeight = getHeightOfEvent(
            event.start.dateTime,
            event.end.dateTime
          );
          let startPosition =
            (getMinutes(new Date(event.start.dateTime)) / 60) * 100;
          return (
            <div className="timeslot events">
              <div
                style={{
                  height: eventHeight + 'px',
                  position: 'absolute',
                  width: '100%',
                  top: startPosition,
                  backgroundColor: 'blue',
                }}
              >
                {event.summary}
              </div>
            </div>
          );
        });
      }
      return <div className="timeslot events"> what?</div>;
      // }
    });
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
