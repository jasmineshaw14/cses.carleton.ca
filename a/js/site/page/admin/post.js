define([
	"jquery",
	"site/PageGenerated",
	"site/session",
	"site/router",
	"cses",
	"scriptup",
	"site/ui/Post"
], function(
	$,
	mkgen,
	session,
	router,
	cses,
	scriptup,
	PostView
) {
	"use strict";
	
	return mkgen("Create a Post — CSES", function($cont){
		cses.hasPermission("postw").done(function(){
			var path = location.pathname.split("/");
			console.log(path);
			switch (path[3]){
			case "new":
				scriptup($cont, function(su){
					su("form", function(su){
						var now = new Date();
						var t = now.getFullYear()+"/"+(now.getMonth()+1)+"/title";
						var url = su("input", {type: "text", val: t});
						su("button", "Create");
						
						this.on("submit", function(e){
							e.preventDefault();
							
							router.pushURL("/"+url.val());
							
							var post = new cses.Post(url.val());
							post.type = "article";
							post.title = "Title";
							post.content.html("<h1>A Heading</h1>");
							var pv = new PostView(post);
							pv.edit();
							$cont.empty().append(pv.$root);
						});
					});
				});
				break;
			default:
				router.load("404");
			}
		}, function(){
			session.loginRequest("/admin/upload");
		});
	});
});
