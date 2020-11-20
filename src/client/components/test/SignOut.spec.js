import React from 'react';
import { shallow } from 'enzyme';
import SignOut from '../SignOut';

const handleSignoutClick = jest.fn();
const setCalendars = jest.fn();
const setEvents = jest.fn();
const setCategories = jest.fn();

describe('<SignOut />', () => {
  it('renders SignOut button and logs user out', () => {
    const wrapper = shallow(
      <SignOut
        handleSignoutClick={handleSignoutClick}
        setCalendars={setCalendars}
        setEvents={setEvents}
        setCategories={setCategories}
      />,
    );

    expect(wrapper.find('button').length).toEqual(1);
  });
});
