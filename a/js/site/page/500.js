define(["scriptup", "site/PageStatic"],
function(scriptup, mkstatic)
{
	"use strict";
	
	var content = scruiptup("div", {
		css: {
			padding: "15px",
			textAlign: "center",
		},
	}, function(su){
		su("h1", "500")
		su("p", "Oops, we messed up.  Please yell at Kevin.");
	});
	
	return mkstatic("500 Internal Server Error — CSES", content);
});
