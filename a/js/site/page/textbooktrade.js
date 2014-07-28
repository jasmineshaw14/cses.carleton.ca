define(["jquery", "site/PageGenerated", "site/router", "cses", "scriptup",
	"underscore", "site/ui/PersonSelect",
], function($, mkgen, router, cses, scriptup, _, PersonSelect)
{
	"use strict";
	
	function genadmin(su, b) {
		su("h2", "TBT Admin");
		
		su("a", {href: "/textbooktrade/book/"+b.id+"/history", text: "View History"});
		
		var buyer, error;
		su("h3", "Sell Book");
		su("form", {
			on: {
				submit: function(e){
					e.preventDefault();
					
					book.sell(buyer.value).except(function(r){
						error.text(r.msg);
					});
				},
			},
		}, function(su){
			su("label", "Buyer", function(su){
				buyer = new PersonSelect();
				this.append(buyer.$root);
			});
			su("button", {type: "submit", text: "Sell"});
			error = su("p");
		});
	}
	
	return mkgen(function($cont){
		document.title = "Text Book Trade — CSES";
		
		var path = document.location.pathname.split("/").slice(2);
		
		scriptup($cont, function(su){
			if (!path.length) {
				su("h1", {text: "Text Book Trade"});
				
				var populateBooks = function populateBooks(){
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
				book.load();
				if (path.length == 2) {
					su("dl", function(su){
						su("dt", "Title");
						su("dd", function(){
							book.titlechanged.add(function(t){this.text(t)}, this);
						});
						su("dt", "Price");
						su("dd", function(){
							book.pricechanged.add(function(p){this.text("$ "+p)}, this);
						});
						su("dt", "Courses");
						su("dd", function(){
							book.courseschanged.add(function(c){
								this.text(c.join(", "))
							}, this);
						});
						su("dt", "Seller");
						su("dd", function(su){
							var self = this;
							book.sellerchanged.add(function(s){
								s.namefullchanged.add(function(nf){
									self.text(nf);
								});
								s.load();
							});
						});
						su("dt", "Bought By");
						su("dd", function(su){
							var self = this;
							book.buyerchanged.add(function(b){
								if (b) {
									b.namefullchanged.add(function(nf){
										self.text(nf);
									});
									b.load();
								} else self.text("None");
							});
						});
					});
					cses.authtoken.done(function(){
						if (cses.authperms.indexOf("tbt") >= 0) {
							genadmin(su, book);
						}
					});
				} else if (path[2] == "history") {
					su("h1", "History");
					su("ul", function(su){
						book.changeschanged.add(function(cs){
							cs.forEach(function(c){
								su("li", {
									css: {
										whiteSpace: "pre",
									}
								}, function(su){
									su("a", {
										href: "/people/"+c.by.id,
										text: c.by.id,
									}, function(su){
										c.by.namefullchanged.add(function(n){
											this.text(n);
										}, this);
										c.by.load();
									});
									this.append(" ");
									su("span", c.desc);
								});
							});
						});
					});
					book.loadChanges();
				} else {
					router.load("/404");
				}
			} else {
				router.load("/404");
			}
		});
	});
});
