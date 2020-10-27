import React from 'react';
import { getThisMonth, getThisYear } from '../date.js';

const CalendarHeader = () => {
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

  return (
    <div className="header">
      <p>{`${months[month]}, ${year}`}</p>
    </div>
  );
};

export default CalendarHeader;
