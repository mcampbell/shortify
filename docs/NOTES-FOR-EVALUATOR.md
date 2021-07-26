# Notes

General notes about my process, and things I'd like to point out.

## Overall/General/Misc

I wrote all this on a Mac, but did try to also test to the extent I could on Ubuntu
(18.04, 20.04), and Windows (10, native npm and WSL2 flavored docker).  The versions of
docker and npm are listed in the various other text files where appropriate.  Other than
testing the app itself, some of the convenience scripts I wrote will only work on a unixy
system.  They should be noted in the docs.

On the UI/Layout, I tried to get as close to the Stord site as I could, but I purposely
did NOT try to use the same CSS or techniques as the site.  As such there are differences,
but I wanted to show what I could do and/or figure out how to do.

In some small cases I specifically made different design choices. (eg: the size and
location/spacing of the social media icons on the bottom; they span the same width as the
Stord logo above them.)

I used [Balsamiq](https://balsamiq.com/) to mock up the screen how I wanted before I
started; both the Balsamiq file and the rendered file are in this directory.

Similarly with a sequence diagram, although this was more for collecting my thoughts than
a 'spec' of the code.

I tried to model the JSON return data in JSON-API format.

You will find a file "Resources.md" here.  It would be dishonest to claim I knew how to do
everything you see here right off the bat.  I knew enough of all the pieces to know where
to look and what to look for, but I used online here and there to see how someone did
something.  When I needed to do that, I tried to put the link of where I found things in
this file as a "citations" history.

Security... I implemented a basic authentication assertion, and check, in the client and
server respectively.  It is in no way secure, but I wanted to show (and commented some) on
how such a thing MIGHT be done with a more robust auth provider.

I used TypeORM's "sync" function to setup the database from scratch at runtime.  The
process is idempotent, but this is not something I'd do in production, generally opting for
migrations and a managed out-of-band database management process.

## Performance

I wrote a crude python and shell load tester in `load-test`.  The README in the directory
has more detail but each python instance will just serially make requests and collect the
response code (hoping for 302's).

Running shortify_server and client in `docker-compose` mode on my Macbook, I get between 2
and 3 calls per second, when running 1 "client".  With 5 clients, it goes to 17-19.  With
10, over 46.  I was able to serve over 100 requests/s with 20 simultaneous clients.

On my development machine it was able to handle at least 75 clients with no
errors. (producing 277 requests/s).


## Things I Wanted To Do, but Didn't

The backend in Elixir.  I really wanted this to be my first "real" elixir project, but it
would have just taken too much time; I don't know the ecosystem well enough to have done
the right level or amount of testing, the code would have been totally non-idiomatic, and
I'd rather just learn the correct/Stord way to do things.

The nav-bar dropdowns.  I just ran out of  self-imposed time to figure this out, so I took
what I thought a representative target would be for each of them and made them links.

A server-managed database (eg: postgres, mysql, etc.)  I know how to use these, I just
chose `sqlite3` for this project since the setup was far easier and it's standard SQL.
With the ORM layer I'm using `typeorm` it would be trivial to convert the CODE; the biggest
change would be the setup and deployment.

Making the site responsive to mobile sizes.  I see that the production Stord site switches
the navbar to a hamburger below a certain size.  I'd have to investigate how this is done
with media queries.

Test coverage values.  I'd have to see how to make Cypress or Jest instrument for this; I
believe it's possible.
