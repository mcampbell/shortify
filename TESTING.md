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

These tests DO require the server be running.

After code installation:
- Start the server: `npm run start`
- Run: `npm run test:cypress`
  - This runs the test in "invisible" headless mode.  You may also run `npm run cypress`
    for the Cypress UI and run manually.  These are using Cypress' ability to make network
    calls and is testing the API, so there isn't much to see.
