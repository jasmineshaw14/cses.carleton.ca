define(["jquery", "site/PageStatic"],
function($, mkstatic)
{
	"use strict";
	
	var content = $("<div>")
		.append($("<p>", {
			text: "Welcome to the new CSES website.  There is nothing here yet.",
		}))
		.append($("<ul>")
			.append($("<li>")
				.append($("<a>", {
					text: "user",
					href: "/user",
				}))
			)
			.append($("<li>")
				.append($("<a>", {
					text: "login",
					href: "/login",
				}))
			)
		);
	
	return mkstatic("Home — CSES", content);
});
