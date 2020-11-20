import React from 'react';
import SignOut from './SignOut';
import { getThisMonth, getThisYear } from '../date.js';

const Navigation = ({ setCalendars, setEvents, setCategories }) => {
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
    <div className="navigation">
      <p>{`${months[month]}, ${year}`}</p>
      {setCalendars && setCategories && setEvents ? (
        <SignOut setCalendars={setCalendars} setCategories={setCategories} setEvents={setEvents} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Navigation;
