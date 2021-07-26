# Running

For your convenience I have tried to provide a number of ways to run the app.


#########################################################################
## `docker-compose`
These instructions were tested with `docker-compose` version 1.29.2

- Install the code (see: INSTALL.md), then...
- `cd shortify/src`
- `docker-compose up` (optionally, add `-d` for daemon/background mode)

Note that this will create a local volume mount in `./src/server-node/volumes/db` to hold
the database file(s).  It may be deleted, but of course any stored data will be deleted
with it.  Running with plain docker (see below) will create the same mount in the same
place in case you want to mix/match running in both ways.

You may view the app at http://localhost:5000/


To shut down, run `docker-compose down` if in daemon/background mode, or Ctrl-c if in foreground.



#########################################################################
## `docker`
These instructions were tested with `docker` version 20.10.7.

- Install the code (see: INSTALL.md), then...

### server
- `cd src/server-node`
- Build the image with the shell script in `src/server-node/bin/docker.build.sh` (unix-y
  systems only)
  -  Alternatively, run: `docker build -t shortify-server:latest .` with your options of choice.
- Run the built image with the shell script in `src/server-node/bin/docker.run.sh`
  - Alternatively, run:
```shell
docker run -it --rm \
       -d \
       --name shortify-server \
       -v ${PWD}/volumes/db:/app/db \
       -p 5001:5001 \
       shortify-server:latest
```

Note that this will create a local volume mount in `./src/server-node/volumes/db` to hold the database
file(s).  It may be deleted, but of course any stored data will be deleted with it.

To shut down, run `docker stop shortify-server`

### client
- cd `src/client`
- Build the image with the shell script in `src/client/bin/docker.build.sh`
  - Alternatively, run `docker build -t shortify-client:latest .` with your options of choice.
- Run the built image with the shell script in `src/client/bin/docker.run.sh`
  - Alternatively, run:
```shell
docker run -it --rm \
       --name shortify-client \
       -d \
       -p 5000:5000 \
       shortify-client:latest
```

You may view the app at http://localhost:5000/


To shut down, run `docker stop shortify-client`

## Cleaning Up (unixy systems)
To clean up any docker remnants, run `./src/bin/cleanup-docker.sh`.  This will:
- stop the `shortify` server and client
- remove the `shortify` server and client containers
- remove the `shortify` built images

It will *not* remove the volume mount however.  This can be safely `rm`'d with the code at
your leisure.




#########################################################################
## `npm`
These instructions were tested with `npm` version 7.18.1.

Install the code (see INSTALL.md), then...

### server
- open a new terminal
- cd `src/server-node`
- run `npm install` (if not done from install)
- run `npm run start`

To shut down, Ctrl-c.

### client
- open a new terminal
- cd `src/client`
- run `npm install` (if not done from install)
- run `npm run start`

You may view the app at http://localhost:5000/


To shut down, Ctrl-c.
