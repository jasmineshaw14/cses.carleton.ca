define(["jquery", "site/PageGenerated", "site/router", "cses", "scriptup",
	"underscore",
], function($, mkgen, router, cses, scriptup, _)
{
	"use strict";
	
	return mkgen(function($cont){
		document.title = "Text Book Trade — CSES";
		
		var path = document.location.pathname.split("/").slice(2);
		
		scriptup($cont, function(su){
			if (!path.length) {
				su("h1", {text: "Text Book Trade"});
				
				function populateBooks(){
					cses.TBTBook.find({
						course: course.val(),
						title: title.val(),
						sold: sold.is(":checked"),
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
				var populateBooksThrottled = _.debounce(populateBooks, 500);
				
				var course, title, sold;
				
				su("label", {text: "Filter by course: "}, function(su){
					course = su("input", {
						type: "text",
						placeholder: "Course code",
						spellcheck: false,
						on: {keyup: populateBooksThrottled},
					});
				}); su("br");
				su("label", {text: "Filter by Title: "}, function(su){
					title = su("input", {
						type: "text",
						placeholder: "Title",
						on: {keyup: populateBooksThrottled},
					});
				}); su("br");
				su("label", {text: "Show sold.",}, function(su){
					sold = su("input", {
						type: "checkbox",
						on: {change: populateBooks},
					});
				}); su("br");
				
				var list = su("ul");
				populateBooks();
			} else if (path[0] == "book") {
				var book = new cses.TBTBook(path[1]);
				book.load().done(function(){
					su("dl", function(su){
						su("dt", "Title");
						su("dd", book.title);
						su("dt", "Price");
						su("dd", "$ "+book.price);
						su("dt", "Courses");
						su("dd", book.courses.join(", "));
						su("dt", "Seller");
						su("dd", function(su){
							var self = this;
							book.seller.load().done(function(){
								self.text(book.seller.namefull);
							});
						});
						su("dt", "Bought By");
						su("dd", function(su){
							if (book.buyer) {
								var self = this;
								book.buyer.load().done(function(){
									self.text(book.buyer.namefull);
								});
							} else this.text("None");
						});
					});
				});
			} else {
				router.load("/404");
			}
		});
	});
});
