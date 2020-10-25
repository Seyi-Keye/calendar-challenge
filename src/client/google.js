// Client ID and API key from the Developer Console
let CLIENT_ID = "519569959381-g5pbpdq464emuom79er0p7r84vf0vuig.apps.googleusercontent.com";
let API_KEY = "AIzaSyB9ooXOLRcFLwiiage8sbOWl10v-xkEGtM";
let allCalendars = [];
let allEvents = [];

// Array of API discovery doc URLs for APIs used by the quickstart
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
let SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

if(typeof window !== 'undefined') {
  var authorizeButton = window.document.getElementById('authorize_button');
  let signoutButton = window.document.getElementById('signout_button');
}
/**
 *  On load, called to load the auth2 library and API client library.
 */
export default function handleClientLoad() {
  window.gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  window.gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    // authorizeButton.style.display = 'none';
    // signoutButton.style.display = 'block';
    // listUpcomingEvents();
    allCalendars = listCalendars();
    return allCalendars;
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
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
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  if(typeof window !== 'undefined') {
    let pre = window.document.getElementById('content');
    let textContent = window.document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }
}

/*
  Print Calendars
*/
function listCalendars() {
  window.gapi.client.calendar.calendarList.list({
    // 'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    let calendars = response.result.items;
    console.log(calendars, 'ooooooo')
    appendPre('Calendars:');

    if (calendars.length > 0) {
      for (let i = 0; i < calendars.length; i++) {
        let calendar = calendars[i];
        appendPre(calendar.summary )
      }
    } else {
      appendPre('No calendars found.');
    }
  });
  return calendars;
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
// function listUpcomingEvents() {
//   window.gapi.client.calendar.events.list({
//     'calendarId': 'primary',
//     'timeMin': (new Date()).toISOString(),
//     'showDeleted': false,
//     'singleEvents': true,
//     'maxResults': 10,
//     'orderBy': 'startTime'
//   }).then(function(response) {
//     let events = response.result.items;
//     console.log(events, 'ooooooo')
//     appendPre('Upcoming events:');

//     if (events.length > 0) {
//       for (let i = 0; i < events.length; i++) {
//         let event = events[i];
//         let when = event.start.dateTime;
//         if (!when) {
//           when = event.start.date;
//         }
//         appendPre(event.summary + ' (' + when + ')')
//       }
//     } else {
//       appendPre('No upcoming events found.');
//     }
//   });
// }

export { allCalendars, allEvents };