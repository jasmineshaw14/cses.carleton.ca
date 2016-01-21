#! /bin/bash

set -ex

tdir="${1:-generated}"
repo='ssh://5699768d89f5cf1123000118@web-cses.rhcloud.com/~/git/web.git/'

if [ -n "$CI" ]; then
	git config --global user.email 'robot@cses.carleton.ca'
	git config --global user.name 'Robot'
fi

git clone "$repo" deploy
cp -r "$tdir" deploy/public_html

bin/clean.sh deploy/public_html

cd deploy
git add -A
git commit -m 'Deploy'
git push origin master
