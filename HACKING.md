# Hacking on CSES Website.

To hack on the CSES website you mostly need a text editor.  However you will
also want a web server to serve the proper files.  This is especially important
as a lot of URLs don't actually have a file backing them.

## Dev Environment
### Apache

This repository has a dev config file for apache as well as a `.htaccess` file
that does the proper rewrites.  Once you have apache and PHP installed the
following command should start the server.

	httpd -DFOREGROUND -f"$repo/httpd.conf" -C"DocumentRoot $repo"

The server will be serving files on `http://localhost:1234/`.

#### No PHP.

While installing PHP is recommended it is only required for the static
fallback.  You will however be required to comment of the config that imports
`mod_php`.

## Project structure
### Static Assets

Static assets go in the `/a/` directory where they are sorted by type.

### Pages

Pages go in `/a/js/page/` and should be called `{name}.js` where name is the
first component of the URL.  The page can also use the `{name}/` directory to
store page-specific assets.

### No Script

The no script pages are useful for non-js browsers and search engines.  They
live in the `/noscript/` directory and are names the same was as the js pages.
