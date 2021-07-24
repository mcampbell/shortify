#!/bin/bash

if [ -n "$BASH" ]; then
    set -o pipefail

    SOURCE="${BASH_SOURCE[0]}"
    while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
        HERE="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
        SOURCE="$(readlink "$SOURCE")"
        [[ $SOURCE != /* ]] && SOURCE="$HERE/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
    done
    HERE="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"


elif [ -n "$ZSH_NAME" ]; then
    HERE="${0:A:h}"
fi

function log() {
    echo $(date +%Y.%m.%d-%H.%M.%S):$$ $*
}

set -eu

THISBIN="$(basename $0)"
LOCK="$HERE"/"$THISBIN".lock

NOW=$(date +%Y-%m-%dT%H:%M:%S)
TIMESTAMP=$(date +%Y-%m-%d.%H-%M-%S)

log Starting.

if ! mkdir "$LOCK" 2>/dev/null; then
    log "Couldn't get lock on $THISBIN". Exiting.
    exit
fi

SCRIPT_STARTED=$(date +%s)
function cleanup() {
    rm -rf "$LOCK" 2>/dev/null
    SCRIPT_TOOK=$(( $(date +%s) - SCRIPT_STARTED ))
    log Ending.  Runtime: $(date -u -d @${SCRIPT_TOOK} +"%T")
    /bin/echo -n ${THREADS}.0 $ITERATIONS \* $SCRIPT_TOOK / p | dc
    echo ' ' requests per second.
}

trap cleanup EXIT

cd "$HERE"

########################################
usage() {
    [ "$#" -gt 0 ] && (echo; echo "error: $*"; echo)
    echo "Usage: $0 [-T threads] [-I iterations]"
    exit 2
}
########################################
THREADS="1"
ITERATIONS=1
while getopts "hT:I:" opt; do
    case $opt in
        h) usage ;;
        T) THREADS="$OPTARG" ;;
        I) ITERATIONS="$OPTARG" ;;
        *) echo "invalid argument"; exit -1 ;;
    esac
done
shift $((OPTIND - 1))

for i in $(seq $THREADS); do
    python ./load.py $ITERATIONS &
done

wait
echo Exiting normally.
