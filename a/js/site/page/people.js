define(["jquery", "site/PageGenerated", "site/session", "cses"],
function($,        mkgen,                session,        cses)
{
	"use strict";
	
	return mkgen("People — CSES", function($cont){
		var uid = location.pathname.split("/")[2];
		console.log(uid);
		
		if (!uid) {
			if (cses.authuser) uid = cses.authuser.id;
			else {
				session.loginRequest("/people");
				return;
			}
		}
		var p = new cses.Person(uid);
		
		var title = $("<h1>").appendTo($cont);
		p.namefullchanged.add(function(n){
			document.title = n+" — CSES";
			title.text(n);
		});
		
		p.load();
	});
});
