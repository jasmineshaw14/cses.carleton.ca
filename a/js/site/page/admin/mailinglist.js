define([
	"jquery",
	"site/PageGenerated",
	"site/session",
	"site/router",
	"cses",
	"scriptup",
], function(
	$,
	mkgen,
	session,
	router,
	cses,
	scriptup
) {
	"use strict";
	
	return mkgen("Create a Post — CSES", function($cont){
		cses.hasPermission("mailinglist").done(function(){
			cses.MailingListSub.fetch().done(r => {
				scriptup($cont, su => {
					su("ul", su => {
						r.requests.forEach(req => {
							su("li", su => {
								su("a", {
									text: req.email,
									href: "mailto:"+req.email,
								});
							});
						});
					});
					if (r.requests.length) {
						su("form", {
							on: {
								submit: e => {
									e.preventDefault();
									cses.MailingListSub.delete(r.deletionkey).done(r => {
										router.go("");
									});
								},
							},
						}, su => {
							su("button", {
								type: "submit",
								text: "Delete these requests.",
							})
						});
					} else {
						su("p", "No outstanding requests.");
					}
				});
			});
		}, function(){
			session.loginRequest("/admin/mailinglist");
			scriptup($cont, su => {
				su("p", "You don't have permission to view this page.");
			})
		});
	});
});
