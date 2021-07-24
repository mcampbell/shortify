#!/usr/bin/env bash

docker build -t shortify-client:dev .

docker run -it --rm \
       -p 5000:5000 \
       shortify-client:dev
