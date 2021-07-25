# Load Test

Very crude shell script which times how long it takes "n" python processes to hit the api
"y" times, then both spits out the output of the python processes in terms of how many
times each response code was returned (302 is a "good" redirect).

The database was seeded with 97391 rows of data before starting, and each request is for a
random row that is known to exist.

## Running

- [optional] set up a python virtual env
- `pip install -r requirements.txt`
- run: `bash ./harness.sh -T <n> -I <y>` # (eg: number of (T)hreads and (I)terations; both
  default to 1)
