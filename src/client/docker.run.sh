#!/usr/bin/env bash

docker build -t shortify-client:dev .

docker run -it --rm \
       --name shortify-client \
       -p 5000:5000 \
       shortify-client:latest
