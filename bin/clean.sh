#! /bin/bash

set -e
shopt -s nullglob

tdir="${1:-generated}/a"
age="${CLEAN_AGE:-0}"

builds=("$tdir"/*)

[ "${#builds[@]}" -le 2 ] && exit

from="${builds[-2]}"
fromdate="$(cat "$from/.build-date")"
cutoff=$(($fromdate - $age*24*60*60))

echo "Removing all builds before $(date -u "-d@$cutoff")"

for b in "${builds[@]}"; do
	if [ '!' -e "$b/.build-date" ]; then
		echo "Removing $b due to missing build metadata."
		rm -r "$b"
	elif [ "$(cat "$b/.build-date")" -lt "$cutoff" ]; then
		echo "Removing $b due to age."
		rm -r "$b"
	fi
done

echo "Remaining builds:"
du -hd1 "$tdir"
