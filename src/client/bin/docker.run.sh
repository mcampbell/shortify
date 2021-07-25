#!/usr/bin/env bash

docker run -it --rm \
       --name shortify-client \
       -d \
       -p 5000:5000 \
       shortify-client:latest
