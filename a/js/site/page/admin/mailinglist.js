define([
	"jquery",
	"moment",
	"site/PageGenerated",
	"site/session",
	"site/router",
	"cses",
	"scriptup",
	"site/ui/Post"
], function(
	$,
	moment,
	mkgen,
	session,
	router,
	cses,
	scriptup,
	PostView
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
		});
	});
});
