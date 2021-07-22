# `node` server

In this directory is the server producing the api for the shortificationer. It is written in `typescript`,
using `express`.

## Notes

There are api tests meant to be run when the server is running; these are run with `cypress` and are in
the `cypress/tests` directory. To keep them from confusing `jest`, they are named `*.spec.[tj]s`.

There are also some `jest` unit tests generally next to the things they are testing; they are named `*.test.[tj]s`.
