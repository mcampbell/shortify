#!/usr/bin/env bash

docker build -t shortify_server:dev .

mkdir -p /tmp/shortify/db
docker run -it --rm \
       -d \
       --name shortify_server \
       -v ./volumes/db:/app/db \
       -p 5001:5001 \
       shortify_server:latest
