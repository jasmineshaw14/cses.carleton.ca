define(["jquery", "site/PageGenerated", "site/router", "cses", "scriptup"],
function($,        mkgen,                router,        cses,   scriptup)
{
	"use strict";
	
	return mkgen(function($cont){
		document.title = "Text Book Trade — CSES";
		
		var path = document.location.pathname.split("/").slice(2);
		
		scriptup($cont, function(su){
			if (!path.length) {
				su("h1", {text: "Text Book Trade"});
				
				var list = su("ul");
				function populateBooks(){
					cses.TBTBook.find({
					
					}).done(function(r){
						list.empty();
						scriptup(list, function(su){
							for (var i = 0; i < r.length; i++){
								su("li", function(su){
									su("h2", function(su){
										su("a", {
											text: r[i].title,
											href: "/textbooktrade/book/"+r[i].id,
										});
									});
								});
							}
						});
					})
				}
				populateBooks();
			} else if (path[0] == "book") {
				var book = new cses.TBTBook(path[1]);
				book.load().done(function(){
					su("dl", function(su){
						su("dt", {text: "Title"});
						su("dd", {text: book.title});
						su("dt", {text: "Courses"});
						su("dd", {text: book.courses.join(", ")});
						su("dt", {text: "Seller"});
						su("dd", function(su){
							var self = this;
							book.seller.load().done(function(){
								self.text(book.seller.namefull);
							});
						});
					});
				});
			} else {
				router.load("404");
			}
		});
	});
});
