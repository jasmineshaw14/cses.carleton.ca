#! /bin/bash

tdir='generated/'
ver=$(printf '%X' $(date -u '+%s'))
rm -rvf "$tdir"

api="${1:-https://api-cses.engsoc.org}"

tmp="$(mktemp -d)"
function onexit {
	rm -r "$tmp"
}
trap onexit EXIT
app="$tmp/a/"

cp -r "a/" "$app"

cat - "$app/js/bootstrap.js" > "$tmp/bootstrap.js" <<EOF
window.DEBUG = false;
window.CSES_API = $(printf '"%q"' "$api");
EOF
mv "$tmp/bootstrap.js" "$app/js/bootstrap.js"

find "$tmp/a/js/" -name '*.js' | parallel -v traceur --script '{}' --out '{}'

echo 'Merging scripts...'
r.js -o 'build.js' "appDir=$app" 'baseUrl=js/' "dir=$tdir/a/$ver/"
rm "$tdir/a/$ver/build.txt" # Remove r.js's file.

echo 'Generating index.html...'
sed -e "s_/a/_/a/$ver/_g" \
    -e "s_http://localhost:8080_${api}_g" 'index.html' \
    | tr -d $'\n' > "$tdir/index.html"

echo 'Gzipping content...'
ignore=(
	'-not' '-name' '*.map'
	'-not' '-name' '*.src.js'
	'-not' '-empty'
)
find "$tdir" -type f "${ignore[@]}" -print0 | parallel -0v 'gzip -nk --best {}'
echo 'Pruning uncompressable content...'
shopt -s globstar
for c in $tdir**/*.gz; do
	o="${c%%.gz}"
	[ -f "$o" ] || continue # Skip if we don't have the source.
	
	cs=$(stat -c %s "$c")
	os=$(stat -c %s "$o")
	if [ $(bc -l <<<"$cs/$os > 0.95") -ne 0 ]; then
		echo "Removing '$c' with ratio $(bc -l <<<"$cs/$os")"
		rm "$c"
	fi
done

echo 'Copying server-side files...'
cp -vr '.htaccess' 'noscript/' "$tdir/"
echo 'Configuring router.php'
perl -pe "s/(^\s*\\\$buildid\s*=).*$/\$1 '$ver';/;" \
     -e  "s,http://localhost:8080,$api," \
         'noscript/router.php' > "$tdir/noscript/router.php"
