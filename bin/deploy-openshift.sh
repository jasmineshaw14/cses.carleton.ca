#! /bin/bash

set -ex

tdir="${1:-generated}"
repo='ssh://5699768d89f5cf1123000118@web-cses.rhcloud.com/~/git/web.git/'
tmp=deploy
html="$tmp/public_html"

rm -rf "$tmp"

if [ -n "$CI" ]; then
	git config --global user.email 'robot@cses.carleton.ca'
	git config --global user.name 'Robot'
fi

git clone "$repo" "$tmp"
rsync -a -IW "$tdir/" "$html/"

bin/clean.sh "$html"

cd "$tmp"
git add -A
git commit -m 'Deploy'
git push origin master
