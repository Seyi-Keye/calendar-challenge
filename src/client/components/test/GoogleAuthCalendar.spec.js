import React from 'react';
import { shallow } from 'enzyme';
import GoogleAuthCalendar from '../GoogleAuthCalendar';

const setCalendars = jest.fn();
const setEvents = jest.fn();
const setCategories = jest.fn();
const setIsSignedIn = jest.fn();
const isSignedIn = false;

describe('<GoogleAuthCalendar />', () => {
  it('renders Login button', () => {
    const wrapper = shallow(
      <GoogleAuthCalendar
        setCalendars={setCalendars}
        setEvents={setEvents}
        setCategories={setCategories}
        setIsSignedIn={setIsSignedIn}
        isSignedIn={isSignedIn}
      />,
    );

    const nodeText =
      ' Welcome to Keyz CalendarUse the login button to connect your Google calendar and view your events for this weekLogin to Google';
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.text()).toEqual(nodeText);
  });
});
