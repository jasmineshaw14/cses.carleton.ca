define([
	"jquery",
	"site/PageGenerated",
	"site/session",
	"site/router",
	"cses",
	"scriptup",
	"site/ui/PersonAdd",
	"q1",
], function($,
	mkgen,
	session,
	router,
	cses,
	scriptup,
	PersonAdd,
	Q
) {
	"use strict";
	
	return mkgen("People — CSES", function($cont){
		var uid = location.pathname.split("/")[2];
		
		scriptup($cont, function(su){
			switch (uid) {
			case "new":
				cses.hasPermission("personw").done(function(){
					var pa = new PersonAdd();
					pa.on("cses:personadd:added", function(e, p){
						router.go("/people/"+p.id);
					});
					$cont.append(pa);
				}, function(){
					session.loginRequest("/people/new");
				})
				break;
			default:
				if (!uid) {
					session.loginPopup().done(function(){
						router.replace("/people/"+cses.authuser.id);
					}, function(e){
						console.log(e);
						router.replace("/");
					});
					break;
				}
				
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
				
				cses.hasPermission("wheel").then(function(){
					su("form", function(su){
						this.on("submit", function(e){
							e.preventDefault();
							
							p.perms = permlist.val().split(",")
							p.save().done(function(){
								var after = "people/"+p.id;
								
								// If our permissions where changed we need
								// a new token, so login again.
								if (cses.authuser.id == p.id) {
									session.logout().finally(function(){
										session.loginRequest(after);
									}).done();
								}
								else
									router.load(after);
							});
						});
						var permlist = su("input", {
							type: "text",
							val: p.perms.join(","),
						});
						p.permschanged.add(function(perms){
							permlist.val(perms.join(","));
						});
						su("button", "Update Permissions");
					});
				});
				
				Q.allSettled([
					cses.hasPermission("personw"),
					cses.hasPermission("selfw"),
				]).spread(function(admin, user){
					if (admin.state == "fulfilled" || (
						user.state == "fulfilled" && uid == cses.authuser.id
					)) {
						su("form", function(su){
							this.on("submit", function(e){
								e.preventDefault();
								
								p.passwordSet(pass.val()).done(function(){
									router.load("people/"+p.id);
								});
							});
							var pass = su("input", {
								type: "password",
								val:  "========",
							});
							su("button", "Change Password");
						});
					}
				});
			}
		});
	});
});
