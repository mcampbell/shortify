# Testing

This code contains a mix of integration tests using [Cypress](https://cypress.io) and unit
tests [Jest](https://jestjs.io).

## server

### Unit Tests
These tests DO NOT require the server be running.

After code installation:
- Go to the server directory: `cd src/server-node`
- Run: `npm run test:unit`

### Integration

These tests DO require the server be running and test the API calls to
the actual server.

After code installation:
- Start the server: `npm run start`
- Run: `npm run test:integration` (this may require a different terminal)
  - This runs the test in "invisible" headless mode.  You may also run `npm run cypress`
    for the Cypress UI and run manually.  These are using Cypress' ability to make network
    calls and is testing the API, so there isn't much to see.

Callout for Linux/Ubuntu.  I ran into the following issues testing on Ubuntu 18.04.
- Error when running: `[nodemon] Internal watch failed: ENOSPC: System limit for number of
  file watchers reached...`
  - Fixed by following the advice [here](https://stackoverflow.com/a/34664097/296853).

- Cypress needs `Xvfb` installed.  Fixed by running `sudo apt install xvfb`


## client

In the client code, all the tests are run with Cypress.  Like the server, these are the
headless/invisible tests, but you may run `npm run cypress` (or `npx cypress open`) to get
the Cypress UI and run whichever sets of tests "manually".

** NOTE ** If you run Cypress tests with `cypress open`, you may get dialogs asking you to
OK a "copy to clipboard" action.  This happens with Chrome and Firefox, but not the
default Electron.  I am not sure why this happens, but I suspect it's a security feature
of the browsers when being driven via script/API, as Cypress does.  I was unable to devote
the time to figuring it all out, or how to not make it happen.  Clicking "Ok" allows the
tests that use clipboard copying to continue.

### Unit Tests

These tests DO NOT require the *SERVER* be running.  They do require the *CLIENT* to be running.

After code installation:
- Go to the client directory: `cd src/client`
- Run: `npm run start` (if not already running)
- Run: `npm run test:unit` (this may require a different terminal)

### Integration Tests

These tests require both the client AND the server to be running.
After code installation:
- Run the server: (if not already running)
  - Go to the server directory: `cd src/server-node`
  - Run: `npm run start`

- Run the client: (if not already running)
  - Go to the client directory: `cd src/client`
  - Run: `npm run start` (if not already running)

- Go to the client directory: `cd src/client`
- Run: `npm run test:integration`


# Testing the deployed app

If you want to run the app in "deployed" mode (docker-compose, docker,
or npm) instead of `npm start` mode, you may the same tests as the
client integration tests, just with a config that points it to the
deployed port, which is different:

- `cd src/client`
- `npm run test:integration-deployed`
