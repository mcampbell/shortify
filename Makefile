.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	@echo Making server docker image for RUNNING...
	cd src/server-node && mkdir -p logs && docker build -t shortify_server:latest . >> logs/server-docker-build.log 2>&1
	@echo Done.  Logs are in logs/server-docker-build.log

	@echo Making client docker image for RUNNING...
	cd src/client && mkdir -p logs && docker build -t shortify_client:latest . >> logs/client-docker-build.log 2>&1
	@echo Done.  Logs are in logs/client-docker-build.log

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080).
server: setup
	@echo Running application in docker-compose...
	cd src && docker-compose up -d
	@echo Application is running at http://localhost:5000

# `make test` will be used after `make setup` in order to run
# your test suite.
test: server
	@echo Installing npm packages for TESTING...
	cd src/server-node && npm install
	cd src/client && npm install

	@echo Running integration suite
	cd src/client && npm run test:integration-deployed

# ######################################################
# Additional targets

# `make stop` will shutdown the containers but not remove anything.
stop:
	docker stop shortify_client 2>/dev/null || true
	docker stop shortify_server 2>/dev/null || true

# `make clean` will remove any/all docker containers and images (unix only)
clean:
	@echo Stopping and removing docker containers and images
	cd src/bin && bash ./cleanup-docker.sh || true


# `make distclean` will remove all the docker stuff, AND the build log files, AND the
# volume mount
dist-clean: clean
	@echo Removing volume mount and log files
	cd src/server-node && if [ -d volumes ]; then rm -rf volumes; fi
	cd src/server-node && if [ -d logs ]; then rm -rf logs; fi
	cd src/client && if [ -d logs ]; then rm -rf logs; fi

distclean: dist-clean
