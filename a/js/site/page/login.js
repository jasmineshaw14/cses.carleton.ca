define(["site/router", "site/PageGenerated", "store2", "site/ui/Login"],
function(router,        mkgen,                store,    Login)
{
	"use strict";
	
	return mkgen("Login — CSES", function($cont){
		var login = new Login();
		login.$root.css({
			margin: "2em auto"
		})
		$cont.append(login.$root);
		login.done.done(function(){
			router.replace(store.get("page-login-next") || "/");
			store.remove("page-login-next");
		});
	});
});
