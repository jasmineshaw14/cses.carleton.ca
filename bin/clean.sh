#! /bin/bash

set -ex
shopt -s nullglob

tdir="${1:-generated}/a"
age="${CLEAN_AGE:-3 days ago}"

builds=("$tdir"/*)

[ "${#builds[@]}" -le 2 ] && exit

from="${builds[-2]}"
