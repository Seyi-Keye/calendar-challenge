import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({
  handleSignoutClick,
  setCalendars,
  setEvents,
  setCategories,
}) => {
  const onSignOutClick = React.useCallback(
    (event) => {
      event.preventDefault();
      handleSignoutClick();
      setCalendars([]);
      setEvents([]);
      setCategories([]);
    },
    [handleSignoutClick, setCalendars, setEvents, setCategories]
  );
  return <button onClick={onSignOutClick}>Log Out</button>;
};

Logout.propTypes = {
  handleSignoutClick: PropTypesfunc.isRequired,
  setCalendars: PropTypesfunc.isRequired,
  setEvents: PropTypesfunc.isRequired,
  setCategories: PropTypes.func.isRequired,
};

export default Logout;
