import React from 'react';
import { mount, shallow } from 'enzyme';
import CalendarEvents from '../CalendarEvents';
import mock from '../../mock.json';
import { getDateToday, getDay, getWeekDates, addSomeHours } from '../../date';
import { it } from 'date-fns/locale';

const events = mock.calenderEvents.events;
const categories = [events[0].category];
const activeDay = String(getDateToday());
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const start = {
  dateTime: new Date(),
};
const end = {
  dateTime: addSomeHours(),
};
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
    expect(wrapper.find('.weekday').map((node) => node.text())).toEqual(datesAndWeekdays);
    expect(wrapper.find('.timeslot').length).toEqual(182);
  });

  it('renders active class and day', () => {
    const wrapper = shallow(
      <CalendarEvents selectedEvents={events} selectedCalendarCategories={categories} />,
    );

    expect(wrapper.find('.active').length).toEqual(1);
    expect(wrapper.find('.active').text()).toEqual(activeDay);
  });

  it('renders an event on the calendar', () => {
    const wrapper = shallow(
      <CalendarEvents selectedEvents={oneEvent} selectedCalendarCategories={categories} />,
    );

    expect(wrapper.find('.eventSummary').text()).toEqual('Suggestion box');
    expect(wrapper.find('.eventTime').text()).toEqual(timeDuration);
  });
});


describe('<CalendarEvents />', () => {
  it('calls currentDate function', () => {
    const wrapper = mount(
      <CalendarEvents 
        selectedEvents={oneEvent} 
        selectedCalendarCategories={categories} 
      />);
    expect(wrapper.mock.call.once).toEqual(true);
  });
});