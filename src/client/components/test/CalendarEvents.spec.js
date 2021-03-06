import React from 'react';
import { shallow } from 'enzyme';
import CalendarEvents from '../CalendarEvents';
import mock from '../../mock.json';
import { getDateToday, getDay, getWeekDates, addSomeHours } from '../../date';

const events = mock.calenderEvents.events;
const categories = [events[0].category];
const activeDay = String(getDateToday());
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const start = {
  dateTime: new Date(),
};
const end = { dateTime: addSomeHours() };

const oneEvent = [{ ...events[0], start, end }];

const datesAndWeekdays = weekdays.map((day, i) => `${getDay(getWeekDates()[i])} ${day}`);

const hourTimer = (date) =>
  new Date(date).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

const timeDuration = hourTimer(new Date()) + ' - ' + hourTimer(addSomeHours());

describe('<CalendarEvents />', () => {
  it('renders calendar', () => {
    const wrapper = shallow(
      <CalendarEvents selectedEvents={events} selectedCalendarCategories={categories} />,
    );

    expect(wrapper.find('.calendar').length).toEqual(1);
  });

  it('renders 7 weekdays and current date with weekday', () => {
    const wrapper = shallow(
      <CalendarEvents selectedEvents={events} selectedCalendarCategories={categories} />,
    );

    expect(wrapper.find('.weekday').length).toEqual(14);
    expect(wrapper.find('.heading').map((node) => node.text())).toEqual(datesAndWeekdays);
    expect(wrapper.find('.timeslot').length).toEqual(168);
  });

  it('renders active class and day', () => {
    const wrapper = shallow(
      <CalendarEvents selectedEvents={events} selectedCalendarCategories={categories} />,
    );

    expect(wrapper.find('.active').length).toEqual(1);
    expect(wrapper.find('.active').text()).toEqual(activeDay);
  });
});
