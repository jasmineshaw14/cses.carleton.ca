define(["jquery", "site/PageGenerated", "site/session", "site/router", "cses", "scriptup"],
function($,        mkgen,                session,        router,        cses,   scriptup)
{
	"use strict";
	
	return mkgen("People — CSES", function($cont){
		var uid = location.pathname.split("/")[2];
		
		if (!uid) {
			cses.authtoken.then(function(){
				router.replace("/people/"+cses.authuser.id);
			}, function(){
				session.loginRequest("/people");
			});
		}
		var p = new cses.Person(uid);
		
		scriptup($cont, function(su){
			var title = su("h1", function(su){
				p.namefullchanged.add(function(n){
					document.title = n+" — CSES";
					this.text(n);
				}, this);
			});
			
			su("ul", function(su){
				p.emailschanged.add(function(emails){
					this.empty()
					
					emails.forEach(function(e){
						su("li", function(su){
							su("a", {href: "mailto:"+e.email, text: e.email});
						});
					});
				}, this);
			});
		});
		p.load();
	});
});
