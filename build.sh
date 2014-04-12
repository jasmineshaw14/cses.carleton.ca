#! /bin/bash

tdir='build/'
rm -rvf "$tdir"

echo 'Merging scripts...'
r.js -o 'build.js'

echo 'Generating index.html...'
tr -d $'\n' < 'index.html' > "$tdir/index.html"

cp -vr '.htaccess' 'noscript/' "$tdir/"
