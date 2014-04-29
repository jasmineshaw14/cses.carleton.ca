define(["jquery", "site/PageStatic"],
function($, mkstatic)
{
	"use strict";
	
	var content = $("<div>", {
		css: {
			padding: "15px",
			textAlign: "center",
		},
	}).append(
		$("<p>", {
			text: "404: I looked really hard but nothing came up.",
			css: {
				margin: "1em",
				fontSize: "1.7em",
			},
		}),
		$("<a>", {
			href: "http://comicjk.com/comic.php/404",
			css: {display: "block"},
		}).append(
			$("<img>", {
				src: "http://comicjk.com/Pics/Comic404.gif",
				css: {maxWidth: "100%"},
			})
		)
	);
	
	return mkstatic("404 Not Found — CSES", content);
});
