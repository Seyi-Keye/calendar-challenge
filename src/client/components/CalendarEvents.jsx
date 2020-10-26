import React from 'react';
import PropTypes from 'prop-types';
import {
  getDateToday,
  getDay,
  getDifferenceInMinutes,
  get12hourFormat,
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

  /**
   * Format time to 12 hours AM/PM
   */
  const hourTimer = (date) =>
    new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

  const range = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );

  /**
   * Display hourly time from 12AM to 11PM
   */
  const timeConverter = () =>
    range(-1, 24, 1).map((x) => {
      let time = get12hourFormat(x);

      return (
        <div className="time" key={x}>
          {time}
        </div>
      );
    });

  /**
   * Calculate and return the height as duration of an event
   * using 100px as height per 1hour slot
   */
  const getHeightOfEvent = (startTime, endTime) => {
    const height = getDifferenceInMinutes(endTime, startTime);
    return (height / 60) * 100;
  };

  /**
   *  matches ea h event to the right timeslot and display
   *  event with appropriate properties and style
   */
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
                  <p className="eventSummary">{summary}</p>{' '}
                  <p className="eventTime">
                    {hourTimer(startDate) + ' - ' + hourTimer(endDate)}
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

  /**
   * Display date and style current date as active
   */
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

CalendarEvents.propTypes = {
  selectedEvents: PropTypes.array,
  selectedCalendarCategories: PropTypes.array,
};

export default CalendarEvents;
