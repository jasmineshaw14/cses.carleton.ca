define(["jquery", "site/main", "site/PageGenerated", "site/session", "cses", "store2"],
function($,        main,        mkgen,                session,        cses,    store)
{
	"use strict";
	
	function loginform() {
		var user = $("<input>", {
			type: "text",
		});
		var pass = $("<input>", {
			type: "password",
		})
		var r = $("<form>")
			.append(user, pass, $("<input>", {
			type: "submit",
			value: "Login",
		}));
		
		r.on("submit", function(e){
			e.preventDefault(); // Don't do browser-default submit.
			
			session.login(user.val(), pass.val()).then(function(r){
				main.router.go(store.get("afterlogin") || "/");
				store.remove("afterlogin");
			}, function(r){
				//@TODO: Display error to user.
				console.log("LOGIN FAILED!", r);
			}).done();
		});
		
		return r;
	}
	
	return mkgen("Login — CSES", function($cont){
		$cont.append($("<h1>", {
			text: "Login",
		}));
		$cont.append(loginform());
	});
});
