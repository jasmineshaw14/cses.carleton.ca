#! /bin/bash

set -e

tdir="${1:-generated}"

rsync -rvz --chmod 775 "$tdir/" kevincox@newstout.engsoc.org:/srv/http/cses.carleton.ca/
