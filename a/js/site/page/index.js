define(["jquery", "cses", "site/main", "site/PageGenerated", "site/templates"],
function($,        cses,   main,        mkgen,                templates)
{
	"use strict";
	
	return mkgen(function($cont){
		console.log("HRE");
		var s = document.location.pathname.substr(1);
		if (!s) s = "index";
		
		var p = new cses.Post(s);
		p.load().then(function(){
			var template = templates[p.type] || templates.article;
			
			template($cont, p);
		}, function(){
			main.router.load("404");
		});
	});
});
