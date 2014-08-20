define([
	"jquery", "cses", "site/router", "site/PageGenerated", "site/templates",
	"scriptup", "site/ui/Banner", "jss", "site/ui/toolbelt", "site/ui/MyBanner",
], function(
	$, cses, router, mkgen, templates, scriptup, Banner, jss, toolbelt, MyBanner
) {
	"use strict";
	
	function uiAdmin(){
		var $t = new toolbelt.Tool("E", "Edit this page");
	}
	
	function uiEdit($e, post){
		var jqtem = "jqueryte1"; // Lazy load.
		require([jqtem], function(jqte){
			
		});
	}
	
	return mkgen(function($cont){
		var s = location.pathname.substr(1);
		if (!s) { // Index page.
			scriptup($cont, function(su){
				var banner = new Banner();
				this.append(banner.$root);
				
				su("h1", {text: "Welcome to the CSES site."});
				su("p", {text: "There is nothing here yet."});
				su("ul", function(su){
					[
						{href: "/hello-world", text: "A page"},
						{href: "/login",text: "Login"},
						{href: "/logout",text: "Logout"},
						{href: "/people", text: "People"},
						{href: "/no-page", text: "Dead link"},
						{href: "/textbooktrade", text: "Textbook Trade"}
					].forEach(function(i){
						su("li", function(su){ su("a", i) });
					});
				});
			});
		} else { // Fetch from database.
			
			// Remove trailing slash.
			if (s.slice(-1) == "/") {
				s = s.replace(/\/+$/, "");
				router.updateURL("/"+s);
			}
			
			var p = new cses.Post(s);
			p.load().then(function(){
				console.log(p.type);
				var template = templates[p.type] || templates.page;
				
				template($cont, p);
				
				cses.authtoken.then(function(t){
					if (t) {
						$cont.append(uiAdmin());
					}
				})
			}, function(){
				router.load("404");
			});
		}
	});
});
