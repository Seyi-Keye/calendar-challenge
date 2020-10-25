import React, { useEffect, useState } from 'react';
import { endOf, startOf } from '../date';
import { DISCOVERY_DOCS, SCOPES } from '../constants';

// Client ID and API key from the Developer Console
let CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let API_KEY = process.env.API_KEY;

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad({
  setCalendars,
  setEvents,
  setIsSignedIn,
  setCategories,
}) {
  window.gapi.load(
    'client:auth2',
    initClient.bind({ setCalendars, setEvents, setIsSignedIn, setCategories })
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
    .then(
      function () {
        // Listen for sign-in state changes.
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(
          updateSigninStatus.bind({
            setCalendars,
            setEvents,
            setIsSignedIn,
            setCategories,
          })
        );

        // Handle the initial sign-in state.
        updateSigninStatus.bind({
          setCalendars,
          setEvents,
          setIsSignedIn,
          setCategories,
        })(window.gapi.auth2.getAuthInstance().isSignedIn.get());
      },
      function (error) {
        appendPre(JSON.stringify(error, null, 2));
      }
    );
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
function handleAuthClick(event) {
  window.gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  window.gapi.auth2.getAuthInstance().signOut();
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
// function getCurrentWeekEvents(category, calendarId, color, events) {
//   window.gapi.client.calendar.events
//     .list({
//       calendarId,
//       timeMin: new Date(startOf).toISOString(),
//       timeMax: new Date(endOf).toISOString(),
//       showDeleted: false,
//       singleEvents: true,
//       orderBy: 'startTime',
//     })
//     .then(function (response) {
//       let weekEvents = response.result.items;

//       if (weekEvents.length > 0) {
//         for (let i = 0; i < weekEvents.length; i++) {
//           let { summary, id, start, end } = weekEvents[i];
//           events.push({ summary, id, start, end, category, color });
//         }
//         return events;
//       }
//     });
// }

/*
  Print Calendars
*/
const getUserCalendarList = (setCalendars, setEvents, setCategories) => {
  window.gapi.client.calendar.calendarList
    .list({
      showDeleted: false,
      singleEvents: true,
      orderBy: 'startTime',
    })
    .then(function (response) {
      const calendarsResponse = response.result.items;
      let calendars = [];
      let events = [];
      let categories = [];

      if (calendarsResponse.length > 0) {
        for (let i = 0; i < calendarsResponse.length; i++) {
          const { backgroundColor, id, summary } = calendarsResponse[i];
          calendars.push({ backgroundColor, id, summary });
          categories.push(summary);

          // let event = getCurrentWeekEvents(
          //   summary,
          //   id,
          //   backgroundColor,
          //   events
          // );
          // events.push(event);
        }
        setCalendars(calendars), setCategories(categories);
        // setEvents(events);
      }
    });
};

const GoogleAuthCalendar = ({ setCalendars, setEvents, setCategories }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    handleClientLoad({ setCalendars, setEvents, setIsSignedIn, setCategories });
  }, []);

  return <div>WE are AFRICANS!!!</div>;
};

export default GoogleAuthCalendar;
