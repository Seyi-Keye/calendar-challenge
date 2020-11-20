import React from 'react';
import { shallow } from 'enzyme';
import { getThisMonth, getThisYear } from '../../date.js';
import Navigation from '../Navigation';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const date = new Date();

const month = getThisMonth(date);
const year = getThisYear(date);
const nodeText = `${months[month]}, ${year}`;

describe('<Navigation />', () => {
  it('renders current month and year', () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.text()).toEqual(nodeText);
  });
});
