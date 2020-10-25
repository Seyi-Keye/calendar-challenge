import React from 'react';

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
export default Logout;
