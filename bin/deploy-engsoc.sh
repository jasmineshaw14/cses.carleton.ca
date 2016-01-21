#! /bin/bash

set -ex

tdir="${1:-generated}"

rsync -rvzp --chmod 775 "$tdir/" kevincox@newstout.engsoc.org:/srv/http/cses.carleton.ca/
