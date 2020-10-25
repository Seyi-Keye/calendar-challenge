import React from 'react';
import {
  getDateToday,
  getDay,
  getDifferenceInMinutes,
  get12hourFormat,
  getTheHour,
  getTheMinutes,
  getWeekDates,
  isSameDay,
  isSameHour,
} from '../date.js';

const CalendarEvents = (props) => {
  const { selectedEvents, selectedCalendarCategories } = props;

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
      let time = get12hourFormat(x);

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
        let { end, start, category } = event;
        let startDate = start.dateTime || start.date;
        const endDate = end.dateTime || end.date;
        let selectedCalendar =
          selectedCalendarCategories &&
          selectedCalendarCategories.includes(category);
        return (
          selectedCalendar &&
          isSameHour(startDate, hour) &&
          isSameDay(endDate, currentDay)
        );
      });

      if (currentDayEvents.length) {
        return (
          <div className="timeslot" key={hour}>
            {currentDayEvents.map((event, i) => {
              let { summary, start, end, backgroundColor } = event;
              let startDate = start.dateTime || start.date;
              const endDate = end.dateTime || end.date;
              let eventHeight = getHeightOfEvent(startDate, endDate);
              let startPosition = (getTheMinutes(startDate) / 60) * 100;
              let width = (1 / currentDayEvents.length) * 90;
              let display = width !== 100 ? 'inline' : 'block';
              let startTime =
                getTheHour(startDate) + ':' + getTheMinutes(startDate);
              let endTime = getTheHour(endDate) + ':' + getTheMinutes(endDate);

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
                  <p>{summary}</p>{' '}
                  <p>
                    {new Date(startDate).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    }) +
                      ' - ' +
                      new Date(startDate).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                  </p>
                </div>
              );
            })}
          </div>
        );
      }

      return <div className="timeslot" key={hour}></div>;
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

export default CalendarEvents;
