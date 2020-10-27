import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ handleSignoutClick, setCalendars, setEvents, setCategories }) => {
  const onSignOutClick = (event) => {
    event.preventDefault();
    handleSignoutClick();
    setCalendars([]);
    setEvents([]);
    setCategories([]);
  };
  return (
    <div className="logout">
      <button onClick={onSignOutClick}>Log Out</button>
    </div>
  );
};

Logout.propTypes = {
  handleSignoutClick: PropTypes.func.isRequired,
  setCalendars: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default Logout;
