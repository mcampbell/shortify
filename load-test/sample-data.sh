#!/bin/bash

# Generate some sample data.

for i in $(seq 100000); do
    url=https://domain-${i}.com/
    short=$(echo "$i" | md5sum | base64 | head -c 7)
    echo "insert into url_mappings(url, shortened) values ('$url', '$short');"
done
