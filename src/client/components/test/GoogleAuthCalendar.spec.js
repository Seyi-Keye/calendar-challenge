import React from 'react';
import { shallow } from 'enzyme';
import GoogleAuthCalendar from '../GoogleAuthCalendar';

const setCalendars = jest.fn();
const setEvents = jest.fn();
const setCategories = jest.fn();

describe('<GoogleAuthCalendar />', () => {
  it('renders Login button', () => {
    const wrapper = shallow(
      <GoogleAuthCalendar
        setCalendars={setCalendars}
        setEvents={setEvents}
        setCategories={setCategories}
      />,
    );

    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.text()).toEqual('Login');
  });
});
