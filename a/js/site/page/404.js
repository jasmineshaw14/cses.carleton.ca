define(["jquery", "site/PageStatic"],
function($, mkstatic)
{
	"use strict";
	
	var content = $("<div>", {
		html:'<p style="margin:1em;font-size:1.7em">404: I looked really hard but nothing came up.</p>'+
		     '<a href="http://comicjk.com/comic.php/404" class="block">'+
		     '<img src="http://comicjk.com/Pics/Comic404.gif" style="max-width:100%"/></a>',
		class: "content",
		css: {
			padding: "15px",
			textAlign: "center",
		},
	});
	
	return mkstatic("404 Not Found — CSES", content);
});
