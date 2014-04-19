define(["jquery", "site/main", "site/PageGenerated", "cses"],
function($,        main,        mkgen,                cses)
{
	"use strict";
	
	return mkgen("User — CSES", function($cont){
		var uid = document.location.pathname.split("/")[2];
		console.log(uid);
		
		if (!uid) {
			if (cses.authuser) uid = cses.authuser.id;
			else {
				main.router.go("/login");
				return;
			}
		}
		var p = new cses.Person(uid);
		
		var title = $("<h1>").appendTo($cont);
		p.namefullchanged.add(function(n){ title.text(n) });
		
		p.load();
	});
});
