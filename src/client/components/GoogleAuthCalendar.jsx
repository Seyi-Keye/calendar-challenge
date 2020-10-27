import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Logout from './Logout';
import { endOf, startOf } from '../date';
import { DISCOVERY_DOCS, SCOPES } from '../constants';

// Client ID and API key from the Developer Console
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.API_KEY;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad({ setCalendars, setEvents, setIsSignedIn, setCategories }) {
  window.gapi.load(
    'client:auth2',
    initClient.bind({ setCalendars, setEvents, setIsSignedIn, setCategories }),
  );
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  const setCalendars = this.setCalendars;
  const setEvents = this.setEvents;
  const setIsSignedIn = this.setIsSignedIn;
  const setCategories = this.setCategories;

  window.gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(function () {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(
        updateSigninStatus.bind({
          setCalendars,
          setEvents,
          setIsSignedIn,
          setCategories,
        }),
      );

      // Handle the initial sign-in state.
      updateSigninStatus.bind({
        setCalendars,
        setEvents,
        setIsSignedIn,
        setCategories,
      })(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  this.setIsSignedIn(isSignedIn);
  if (isSignedIn) {
    getUserCalendarList(this.setCalendars, this.setEvents, this.setCategories);
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  window.gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  window.gapi.auth2.getAuthInstance().signOut();
}

/**
 * Fetch and build each events for all calendars
 */
function getCurrentWeekEvents(calendar) {
  const { id, summary, backgroundColor } = calendar;

  return window.gapi.client.calendar.events
    .list({
      calendarId: id,
      timeMin: new Date(startOf).toISOString(),
      timeMax: new Date(endOf).toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    })
    .then(function (response) {
      return response.result.items
        .map((item) => ({ ...item, category: summary, backgroundColor }))
        .map(({ id, category, summary, backgroundColor, start, end }) => ({
          id,
          category,
          summary,
          backgroundColor,
          start,
          end,
        }));
    });
}

/**
 * Fetch user calendars, categories and associated events
 * set the states of the app
 */
const getUserCalendarList = (setCalendars, setEvents, setCategories) => {
  window.gapi.client.calendar.calendarList
    .list({
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    })
    .then((response) => {
      const calendarsResponse = response.result.items;
      let calendars = calendarsResponse.map(({ backgroundColor, id, summary }) => ({
        backgroundColor,
        id,
        summary,
      }));
      let categories = [calendars[0].summary];

      setCalendars(calendars);
      setCategories(categories);

      return Promise.all(
        calendarsResponse.map((x) => {
          return getCurrentWeekEvents(x);
        }),
      ).then((events) => setEvents(events.flat()));
    });
};

const GoogleAuthCalendar = ({
  isSignedIn,
  setCalendars,
  setCategories,
  setEvents,
  setIsSignedIn,
}) => {
  useEffect(() => {
    handleClientLoad({ setCalendars, setEvents, setIsSignedIn, setCategories });
  }, [setCalendars, setEvents, setIsSignedIn, setCategories]);

  return (
    <div>
      {isSignedIn ? (
        <Logout
          handleSignoutClick={handleSignoutClick}
          setCalendars={setCalendars}
          setEvents={setEvents}
          setCategories={setCategories}
        />
      ) : (
        <div className="login">
          <button onClick={handleAuthClick}>Login</button>
        </div>
      )}
    </div>
  );
};

GoogleAuthCalendar.propTypes = {
  setCalendars: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  setCategories: PropTypes.func,
};

export default GoogleAuthCalendar;
