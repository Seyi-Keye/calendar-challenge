import React from 'react';
import PropTypes from 'prop-types';
import {
  dayEndTime,
  dayStartTime,
  getDateToday,
  getDay,
  get12hourFormat,
  getTheMinutes,
  getWeekDates,
  hourTimer,
  isSameDay,
  isSameHour,
} from '../date.js';
import { getHeightOfEvent, range } from '../eventUtility';

const CalendarEvents = (props) => {
  const { selectedEvents, selectedCalendarCategories } = props;

  const getWeek = getWeekDates();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /**
   * Display hourly time from 12AM to 11PM
   */
  const timeConverter = () =>
    range(0, 23, 1).map((x) => {
      let time = get12hourFormat(x);

      return (
        <div className="time" key={x}>
          <span className="time-span">{time}</span>
        </div>
      );
    });

  /**
   *  matches each event to the right timeslot and display
   *  event with appropriate properties and style
   */
  const eventConverter = (events, currentDay) => {
    return range(0, 23, 1).map((hour) => {
      let currentDayEvents = events.filter((event) => {
        let { end, start, category } = event;
        let startDate = start.dateTime || start.date;
        let endDate = end.dateTime || end.date;
        // check for date with timestamp
        const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9]:/g;

        if (startDate.match(regex) === null) {
          // all day event
          startDate = dayStartTime(startDate);
          endDate = dayEndTime(startDate);
        }

        let selectedCalendar =
          selectedCalendarCategories && selectedCalendarCategories.includes(category);
        return selectedCalendar && isSameHour(startDate, hour) && isSameDay(endDate, currentDay);
      });

      if (currentDayEvents.length) {
        return (
          <div className="timeslot" key={hour}>
            {currentDayEvents.map((event, i) => {
              let { summary, start, end, backgroundColor } = event;
              let startDate = start.dateTime || start.date;
              let endDate = end.dateTime || end.date;
              // check for date with timestamp
              const regex = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T(2[0-3]|[01][0-9]):[0-5][0-9]:/g;

              if (startDate.match(regex) === null) {
                // all day event
                startDate = dayStartTime(startDate);
                endDate = dayEndTime(startDate);
              }
              let eventHeight = getHeightOfEvent(startDate, endDate);
              let startPosition = (getTheMinutes(startDate) / 60) * 75;
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
                    paddingLeft: '5px',
                    margin: '0.1em',
                    overflow: 'scroll',
                  }}
                >
                  <p className="eventSummary" style={{ backgroundColor: backgroundColor }}>
                    {summary}
                  </p>{' '}
                  <p className="eventTime" style={{ backgroundColor: backgroundColor }}>
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
  const currentDate = (index, weekday) => {
    // const backgroundColor = selectedEvents
    //   ? selectedEvents[0] && selectedEvents[0].backgroundColor
    //   : 'red';
    if (getDay(getWeek[index]) === getDateToday()) {
      return (
        <>
          <div className="active">{getDay(getWeek[index])}</div>
          <div className="activeDay"> {weekday}</div>
        </>
      );
    }
    return (
      <>
        <span className="weekdayNumber">{getDay(getWeek[index])}</span>
        <span className="weekdayText"> {weekday}</span>
      </>
    );
  };

  return (
    <div className="calendar">
      <div className="stick">
        <div className="stickyHeader">{''}</div>
        <div className="weekdays">
          {weekdays.map((weekday, index) => {
            return (
              <div className="weekday" key={weekday}>
                <div className="heading" key={weekday}>
                  {currentDate(index, weekday)}
                </div>
              </div>
            );
          })}
        </div>
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

CalendarEvents.propTypes = {
  selectedEvents: PropTypes.array,
  selectedCalendarCategories: PropTypes.array,
};

export default CalendarEvents;
