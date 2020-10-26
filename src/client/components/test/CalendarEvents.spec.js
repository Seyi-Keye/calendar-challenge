import React from 'react';
import { shallow } from 'enzyme';
import CalendarEvents from '../CalendarEvents';
import mock from '../../mock.json';

const events = mock.calenderEvents.events;
const categories = [events[0].category];

describe('<CalendarEvents />', () => {
  it('renders calendar', () => {
    const wrapper = shallow(<CalendarEvents selectedEvents={events}
        selectedCalendarCategories={categories} />);
        console.log('ppp', wrapper.find('.timeslot').length)
    expect(wrapper.find('.calendar').length).toEqual(1);
    expect(wrapper.find('.active').length).toEqual(1);
    expect(wrapper.find('.weekday').length).toEqual(7);
    expect(wrapper.find('.timeslot').length).toEqual(182);

  });
});
