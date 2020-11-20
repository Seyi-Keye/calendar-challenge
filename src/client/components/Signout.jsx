import React from 'react';
import PropTypes from 'prop-types';
import { handleSignoutClick } from './GoogleAuthCalendar';

const SignOut = ({ setCalendars, setEvents, setCategories }) => {
  const onSignOutClick = (event) => {
    event.preventDefault();
    handleSignoutClick();
    setCalendars([]);
    setEvents([]);
    setCategories([]);
  };
  return (
    <div className="signOut">
      <button onClick={onSignOutClick}>Sign Out</button>
    </div>
  );
};

SignOut.propTypes = {
  setCalendars: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default SignOut;
