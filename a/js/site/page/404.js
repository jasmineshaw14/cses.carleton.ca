define(["scriptup", "site/PageStatic"],
function(scriptup, mkstatic)
{
	"use strict";
	
	var content = scriptup("div", {
		css: {
			textAlign: "center",
		},
	}, function(su){
		su("h1", "404");
		su("p", "I looked really hard but nothing came up.");
		su("a", {href: "http://comicjk.com/comic.php/404"}, function(su){
			su("img", {
				src: "http://comicjk.com/Pics/Comic404.gif",
				css: {
					maxWidth: "100%",
				},
			});
		});
	});
	
	return mkstatic("404 Not Found — CSES", content);
});
