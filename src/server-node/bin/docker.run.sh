#!/usr/bin/env bash

docker run -it --rm \
       -d \
       --name shortify_server \
       -v ${PWD}/volumes/db:/app/db \
       -p 5001:5001 \
       shortify_server:latest
