.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	echo Making server docker image for RUNNING...
	cd src/server-node && docker build -t shortify_server:latest .
	echo Making client docker image for RUNNING...
	cd src/client && docker build -t shortify_client:latest .

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080).
server: setup
	echo Running application in docker-compose...
	cd src && docker-compose up -d

# `make test` will be used after `make setup` in order to run
# your test suite.
test: server
	echo Installing npm packages for TESTING...
	cd src/server-node && npm install
	cd src/client && npm install

	echo Running integration suite
	cd src/client && npm run test:integration-deployed

# ######################################################
# Additional targets

# `make stop` will shutdown the containers but not remove anything.
stop:
	docker stop shortify_client 2>/dev/null
	docker stop shortify_server 2>/dev/null

# `make clean` will remove any/all docker containers and images (unix only)
clean:
	cd src/bin && bash ./cleanup-docker.sh || true
