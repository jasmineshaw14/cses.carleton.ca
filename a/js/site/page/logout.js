define(["jquery", "site/main", "site/PageGenerated", "site/session"],
function($,        main,        mkgen,                session)
{
	"use strict";
	
	return mkgen("Logout — CSES", function($cont){
		$cont.append($("<input>", {
			type: "button",
			value: "Logout",
		}).on("click", function(){
			session.logout();
			main.router.go("/");
		}));
	});
});
