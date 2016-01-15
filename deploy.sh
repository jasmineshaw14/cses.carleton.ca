#! /bin/bash

set -e

tdir="${1:-generated}"

# Deploy to EngSoc

rsync -rvzp --chmod 775 "$tdir/" kevincox@newstout.engsoc.org:/srv/http/cses.carleton.ca/

# Deploy to OpenShift

if [ -n "$CI" ]; then
	git config --global user.email 'robot@cses.carleton.ca'
	git config --global user.name 'Robot'
fi

mkdir deploy
cp -r "$tdir" deploy/public_html
cd deploy
git init
git add .
git commit -m 'Deploy'
git push --force ssh://5699768d89f5cf1123000118@web-cses.rhcloud.com/~/git/web.git/ master
