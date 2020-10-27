import React from 'react';
import { shallow } from 'enzyme';
import Logout from '../Logout';

const handleSignoutClick = jest.fn();
const setCalendars = jest.fn();
const setEvents = jest.fn();
const setCategories = jest.fn();
const event = { preventDefault: jest.fn() };

describe('<Logout />', () => {
  it('renders logout button and logs user out', () => {
    const wrapper = shallow(
      <Logout
        handleSignoutClick={handleSignoutClick}
        setCalendars={setCalendars}
        setEvents={setEvents}
        setCategories={setCategories}
      />,
    );

    expect(wrapper.find('button').length).toEqual(1);

    wrapper.find('button').simulate('click', event);
    expect(event.preventDefault).toBeCalled();
  });
});
