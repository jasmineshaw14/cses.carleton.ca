define(["jquery", "site/router", "site/PageGenerated", "site/session"],
function($,        router,        mkgen,                session)
{
	"use strict";
	
	return mkgen("Logout — CSES", function($cont){
		$cont.append($("<input>", {
			type: "button",
			value: "Logout",
		}).on("click", function(){
			session.logout();
			router.go("/");
		}));
	});
});
