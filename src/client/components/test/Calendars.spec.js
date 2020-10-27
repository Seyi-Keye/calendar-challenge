import React from 'react';
import { shallow } from 'enzyme';
import Calendars from '../Calendars';
import mock from '../../mock.json';

const calendars = mock.calendars.items;
const categories = [calendars[0].summary];
const toggleSelectedCalendar = jest.fn();
const displayedCalendars = [
  'aromokeyes2@gmail.com',
  'Birthdays',
  'Christian Holidays',
  'Holidays in Nigeria',
];

describe('<Calendars />', () => {
  it('renders calendars and their summary', () => {
    const wrapper = shallow(
      <Calendars
        calendars={calendars}
        selectedCalendarCategories={categories}
        toggleSelectedCalendar={toggleSelectedCalendar}
      />,
    );

    expect(wrapper.find('.calendars').length).toEqual(1);
    expect(wrapper.find('p').text()).toEqual('CALENDARS');
    expect(wrapper.find('.card').map((node) => node.text())).toEqual(displayedCalendars);
  });
});
