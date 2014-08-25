define([
	"jquery",
	"site/PageGenerated",
	"site/session",
	"site/router",
	"cses",
	"scriptup",
	"site/ui/PersonAdd",
], function($,
	mkgen,
	session,
	router,
	cses,
	scriptup,
	PersonAdd
) {
	"use strict";
	
	return mkgen("People — CSES", function($cont){
		var uid = location.pathname.split("/")[2];
		
		scriptup($cont, function(su){
			switch (uid) {
			case "":
				if (!uid) {
					session.loginPopup().done(function(){
						router.replace("/people/"+cses.authuser.id);
					}, function(e){
						console.log(e);
						router.replace("/");
					});
				}
				break;
			case "new":
				cses.hasPermission("personw").done(function(){
					var pa = new PersonAdd();
					pa.on("cses:personadd:added", function(e, p){
						router.go("/people/"+p.id);
					});
					$cont.append(pa);
				}, function(){
					console.log("JEere");
					session.loginRequest("/people/new");
				})
				break;
			default:
				var p = new cses.Person(uid);
				
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
				p.load();
			}
		});
	});
});
