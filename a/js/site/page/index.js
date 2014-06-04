define(["jquery", "cses", "site/main", "site/PageGenerated", "site/templates"],
function($,        cses,   main,        mkgen,                templates)
{
	"use strict";
	
	return mkgen(function($cont){
		var s = document.location.pathname.substr(1);
		if (!s) { // Index page.
			$cont.append(
				$("<h1>Welcome to the CSES site</h1>"),
				$("<p>There is nothing here yet</p>"),
				$("<ul>").append(
					$("<li>").append($("<a>", {
						href: "/hello-world",
						text: "A page",
					})),
					$("<li>").append($("<a>", {
						href: "/login",
						text: "Login",
					})),
					$("<li>").append($("<a>", {
						href: "/people",
						text: "People",
					})),
					$("<li>").append($("<a>", {
						href: "/no-page",
						text: "Dead link",
					}))
				)
			);
		} else { // Fetch from database.
			
			// Remove trailing slash.
			if (s.slice(-1) == "/") {
				s = s.replace(/\/+$/, "");
				main.router.updateURL("/"+s);
			}
			
			var p = new cses.Post(s);
			p.load().then(function(){
				console.log(p.type);
				var template = templates[p.type] || templates.page;
				
				template($cont, p);
			}, function(){
				main.router.load("404");
			});
		}
	});
});
