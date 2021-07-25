#!/bin/bash

docker stop shortify{-,_}{client,server} 2>/dev/null
docker rm shortify{-,_}{client,server} 2>/dev/null

( docker images | egrep "shortify.(client|server)" | awk '{print $3}' ) | xargs -r docker rmi

# If you have a docker-cleanup.sh in ~/bin, run it.
[ -x "$HOME/bin/docker-cleanup.sh" ] && "$HOME/bin/docker-cleanup.sh"

docker images
