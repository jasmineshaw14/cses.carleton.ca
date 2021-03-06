#! /bin/bash

set -ex
shopt -s nullglob

tdir="${1:-generated}/a"
age="${CLEAN_AGE:-2}"

builds=("$tdir"/*)

if [ "${#builds[@]}" -le 2 ]; then
	echo "Less then two builds, exiting."
	exit
fi

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
