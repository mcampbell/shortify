#!/usr/bin/env bash

docker run -it --rm \
       -d \
       --name shortify-server \
       -v ${PWD}/volumes/db:/app/db \
       -p 5001:5001 \
       shortify-server:latest
