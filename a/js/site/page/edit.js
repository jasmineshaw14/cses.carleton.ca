define(["jquery", "site/main", "site/PageGenerated", "site/session", "cses", "store2"],
function($,        main,        mkgen,                session,        cses,    store)
{
	"use strict";
	
	return mkgen(function($cont){
		$cont.append($("<h1>", {
			text: "Login",
		}));
		$cont.append(loginform());
	});
});
