define(["jquery", "site/PageGenerated", "site/session", "site/router", "cses", "scriptup"],
function($,        mkgen,                session,        router,        cses,   scriptup)
{
	"use strict";
	
	return mkgen("People — CSES", function($cont){
		var uid = location.pathname.split("/")[2];
		
		if (!uid) {
			session.loginPopup().done(function(){
				router.replace("/people/"+cses.authuser.id);
			}, function(e){
				console.log(e);
				router.replace("/");
			});
			return;
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
