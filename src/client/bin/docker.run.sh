#!/usr/bin/env bash

docker run -it --rm \
       -d \
       -p 5000:5000 \
       shortify-client:latest
