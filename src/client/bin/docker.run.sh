#!/usr/bin/env bash

docker run -it --rm \
       --name shortify_client \
       -d \
       -p 5000:5000 \
       shortify_client:latest
