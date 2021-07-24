# Notes

General notes about my process, and things I'd like to point out.

## Overall/General/Misc

On the UI/Layout, I tried to get as close to the Stord site as I could, but I purposely
did NOT try to use the same CSS or techniques as the site.  As such there are differences,
but I wanted to show what I could do and/or figure out how to do.

In some small cases I made specific design choices differently. (eg: the size and
location/spacing of the social media icons on the bottom; they span the same width as the
Stord logo above them.)

I used [Balsamiq](https://balsamiq.com/) to mock up the screen how I wanted before I
started; both the Balsamiq file and the rendered file are in this directory.

Similarly with a sequence diagram, although this was more for collecting my thoughts than
a 'spec' of the code.


## Things I Wanted To Do, but Didn't

The nav-bar dropdowns.  I just ran out of self-imposed time to figure this out, so I took
what I though a representative target would be for each of them and made them links.

A server-managed database (eg: postgres, mysql, etc.)  I know how to use these, I just
chose `sqlite3` for this project since the setup was far easier and it's standard SQL.
With the ORM layer I'm using `typeorm` it would be trivial to convert the CODE;
the big change would be the setup and deployment.

Making the site responsive to mobile sizes.  I see that the production Stord site switches
the navbar to a hamburger below a certain size.  I'd have to investigate how this is done
with media queries or straight css.

Test coverage values.  I'd have to see how to make Cypress or Jest instrument for this.
