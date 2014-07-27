define([
	"jquery", "site/PageGenerated", "site/session", "site/router", "cses",
	"scriptup", "site/ui/PersonSelect", "site/ui/PersonCompleter",
	"site/ui/lightbox",
], function(
	$, mkgen, session, router, cses, scriptup, PersonSelect, PersonCompleter,
	LightBox
) {
	"use strict";
	
	return mkgen("Textbook Trade Admin — CSES", function($cont){
		session.loginRequest("/admin/textbooktrade");
		
		var path = document.location.pathname.split("/").slice(3);
		
		scriptup($cont, function(su){
			if (!path.length) {
				su("h1", "Textbook Trade Admin");
				su("ul", function(su){
					[
						{href: "summary", text: "Summary"},
						{href: "add", text: "Add Books"},
					].forEach(function(i){
						i.href = "/admin/textbooktrade/" + i.href;
						su("li", function(su){ su("a", i) });
					});
				});
			} else if (path[0] == "summary") {
				su("h1", "Textbook Trade Summary");
				su("p", "Comming Soon!");
			} else if (path[0] == "add") {
				su("h1", "Textbook Trade Add");
				var error;
				var title, courses, price, seller, authorized;
				su("form", {
					on: {submit: function(e){
						e.preventDefault();
						
						var b = new cses.TBTBook();
						b.title = title.val() || undefined;
						b.courses = courses.val()
						                   .replace(/[^\w]/, '')
						                   .split(",")
						                   .filter(function(s){return s});
						b.price = price.val() || undefined;
						b.seller = seller.value;
						b.save(authorized.value).then(function(r){
							router.go("/textbooktrade/book/"+r.id);
						}, function(e){
							console.log(e, e.msg);
							error.text(e.msg);
						});
					}},
				}, function(su) {
					su("label", {text: "Title "}, function(su){
						title = su("input", {type: "text"});
					}); su("br");
					su("label", {text: "Courses"}, function(su){
						courses = su("input", { prop: {
							type: "text", placeholder:"ecor1010,fart1234"
						}});
					}); su("br");
					su("label", {text: "Price"}, function(su){
						price = su("input", {type: "number", min:0, step:0.01});
					}); su("br");
					su("label", {text: "Seller"}, function(su){
						seller = new PersonSelect();
						this.append(seller.$root);
					}); su("br");
					su("label", {text: "Authorized By"}, function(su){
						su("input", {type: "text"}, function(su){
							authorized = new PersonCompleter(this);
						});
					}); su("br");
					su("button", {type: "submit", text: "Submit"});
				});
				error = su("div");
			} else {
				router.load("/404");
			}
		});
	});
});
