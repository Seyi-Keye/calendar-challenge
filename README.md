# calendar-challenge

This is a Week View app using React that integrates with Google Calendar.

### Technical Considerations

- React v16, Google Account and webpack.

### Feature Requirements

- Google Login: Prompt user to login with their Google account
- Calendar view: Display a static view of the current week showing the 7 days of the week on the x-axis, and 24 hours of the day on the y-axis
- Hourly view: The week view should show a grid of 1 hour slots
- List calendars: List available calendars associated with the google account on the left side
- Event view: Display events for the current week inside the view with blocks representing their duration, include the event's title, start time, and end time
- Toggle calendars: Allow the user to toggle calendars from the calendar list on the left, toggling a calendar on will show related events, and toggling it off will hide related events. You can toggle multiple calendars at the same time
- Header view: Fixed week days header with scrollable hours grid
- Active current day: Current day is indicated with a circle around the date
- App Header: Current month and year are displayed in the view header

### Additional features

- Conflict events view: display conflicting events side by side

### To setup this app locally:

- Have Node version v10.14.2 and above installed locally.
- Clone this repo: `git clone git@github.com:Seyi-Keye/calendar-challenge.git`
- Cd into the directory where this project is installed. Run `cd calendar-challenge`.
- To fetch updated yarn packages, run `yarn install --check-files`.
- To install dependencies, run `yarn install`.
- create a `.env` file on your root directory by running `touch .env` on your terminal
- Use the `.exampleEnv` to get the keys into your `.env`
- Populate the values of the `.env` file with the shared credentials to connect the app locally before running the app.
- To start the app locally, run `yarn start:dev`.

### Linting

This app uses Eslint and Prettier for code formatting.

### Testing

- To run the tests:

  - `yarn test`
