#!/usr/bin/env bash

docker build -t shortify_client:dev .

docker run -it --rm \
       --name shortify_client \
       -p 5000:5000 \
       shortify_client:latest
