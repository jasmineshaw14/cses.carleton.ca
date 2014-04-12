define(["jquery", "site/main", "site/PageGenerated", "cses"],
function($,        main,        mkgen,                cses)
{
	"use strict";
	
	return mkgen("User — CSES", function($cont){
		var uid = document.location.pathname.split("/")[1];
		
		if (!uid) {
			if (cses.authuser) uid = cses.authuser.id;
			else {
				
				main.router.go("/login");
				return;
			}
		}
		
		$cont.append($("<h1>", {
			text: "User",
		}));
	});
});
