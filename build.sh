#! /bin/bash

tdir='build/'
ver=$(printf '%X' $(date -u '+%s'))
rm -rvf "$tdir"

echo 'Merging scripts...'
r.js -o 'build.js' "dir=$tdir/a/$ver/"

echo 'Generating index.html...'
sed -e "s_/a/js/_/a/$ver/js/_g" 'index.html' | tr -d $'\n' > "$tdir/index.html"

cp -vr '.htaccess' 'noscript/' "$tdir/"
echo 'Adding build id to router.php...'
perl -pe "s/(^\s*\\\$buildid\s*=).*$/\$1 \"$ver\";/" 'noscript/router.php' > "$tdir/noscript/router.php"
