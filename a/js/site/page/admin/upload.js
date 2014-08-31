define(["jquery", "site/PageGenerated", "site/session", "cses", "scriptup"],
function($,        mkgen,                session,        cses,   scriptup)
{
	"use strict";
	
	var out;
	
	function uploadFile(f) {
		scriptup("div", function(su){
			su("h2", {text: f.name});
			var progress = su("p");
			cses.uploadFile(f).done(function(r){
				console.log(r);
				progress.text("Complete");
				su("a", {text: r.url, href: r.url});
			}, function(e){
				progress.text(e.msg || "Error").css("color", "red");
			}, function(p){
				progress.text(p.complete+"/"+p.total+" ("+p.percent+")");
			});
		}).appendTo(out);
	}
	
	return mkgen("Upload — CSES", function($cont){
		cses.hasPermission("upload").then(function(){
			scriptup($cont, function(su){
				su("h1", {text: "Upload"});
				su("input", {
					attr: {
						type: "file",
						multiple: true,
					},
					on: { change: function(e){
						e.preventDefault();
						
						for (var i = 0; i < this.files.length; i++)
							uploadFile(this.files[i]);
					} },
				});
				out = su("div");
			});
		}, function(){
			session.loginRequest("/admin/upload");
		});
	});
});
