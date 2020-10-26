import React from 'react';
import { shallow } from 'enzyme';
import App, { CalendarView } from '../App';

describe('<App />', () => {
  it('renders <GoogleAuthCalendar />  and <CalendarView /> components', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find('GoogleAuthCalendar').length).toEqual(1);
    expect(wrapper.find('CalendarView').length).toEqual(1);
  });
});

describe('<CalendarView />', () => {
  it('renders 3 components', () => {
    const wrapper = shallow(<CalendarView />);

    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('CalendarHeader').length).toEqual(1);
    expect(wrapper.find('CalendarEvents').length).toEqual(1);
  });
});
