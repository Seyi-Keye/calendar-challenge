import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import mock from '../../mock.json';

const categories = [events[0].category];
const events = mock.calenderEvents.events;
const calendars = mock.calendars.items;

const initialState = {
  calendars,
  events,
  categories
};

describe('<App />', () => {
  it('renders <GoogleAuthCalendar /> component', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('GoogleAuthCalendar').length).toEqual(1);

    // wrapper.find('button').simulate('click', event);
    // expect(event.preventDefault).toBeCalled();
  });
});
