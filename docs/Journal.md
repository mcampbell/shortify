# Coding Exercise Journal

## 2020-07-09

Was given the exercise today, so read it over and began to think about approaches, what to do, what to omit, etc.
Basically just mull over it, get a mental feel for how I want to approach things.

1.5h

## 2020-07-10

Took a look at some prior art; the Stord site, tinyurl, bit.ly, a few others.  Started a quick Balsamiq sketch using the popular overall view/layout of such a site.

Started a sequence diagram for the backend shortening part.

Questions/decisions:
* Should the shortener be idempotent?  I think probably yes.  Not sure what a use case might even be for not.  It uses less space as well, and could reduce the possibility of a resource exhaustion attack.
* Validate input on the server as well as client.
* Return a 422 on bad input.  (400 is common/popular, but 422 feels better; the request is well understood and the syntax of the *request* is fine, just the entity/data is bad.)
* Should we throttle the inputs (eg: by IP?)  In general, perhaps, to avoid an attack, but probably best done at the cloud provider/nginx/etc. level rather than at this service.

1.5h

## 2020-07-12

Basic app setup.  github project, prettier, cypress, react app boilerplate, node.

~1h
-- Submitted to David.

## 2020-07-13

Basic react component layout, installed font(s).
First Cypress test to ensure app comes up with the barest of essentials.

1h

## 2020-07-14

Added <head> meta stuff (mainly for title) using `react-helmet`
