define([
	"jquery",
	"site/PageGenerated",
	"site/session",
	"site/router",
	"cses",
	"scriptup",
	"site/ui/PersonSelect",
	"site/ui/PersonCompleter",
	"site/ui/lightbox",
	"site/ui/TitleComplete",
	"q1",
	"papaparse4"
], function(
	$,
	mkgen,
	session,
	router,
	cses,
	scriptup,
	PersonSelect,
	PersonCompleter,
	LightBox,
	TitleComplete,
	Q,
	Papa
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
						{href: "/admin/textbooktrade/summary", text: "Summary"},
						{href: "/admin/textbooktrade/add", text: "Add Books"},
						{href: "/admin/textbooktrade/dump", text: "Dumps"},
						{href: "/textbooktrade", text: "Book List"},
					].forEach(function(i){
						i.href = i.href;
						su("li", function(su){ su("a", i) });
					});
				});
			} else if (path[0] == "summary") {
				su("h1", "Textbook Trade Summary");
				cses.TBTBook.stats().then(function(s){
					su("dl", function(su){
						su("dt", "Total Value");
						su("dd", "$"+s.price);
						su("dt", "Total Books");
						su("dd", ""+s.books);
						su("dt", "Sold Value");
						su("dd", "$"+s.pricesold);
						su("dt", "Sold Books");
						su("dd", ""+s.bookssold);
						su("dt", "Paid Value");
						su("dd", "$"+s.pricepaid);
						su("dt", "Paid Books");
						su("dd", ""+s.bookspaid);
						su("dt", "Cash on Hand");
						su("dd", "$"+(s.pricesold-s.pricepaid));
					});
				});
			} else if (path[0] == "dump") {
				var error;
				var sold, unsold, paid, unpaid;
				su("form", {
					on: {submit: function(e){
						e.preventDefault();
						
						var soldp;
						if (!sold.prop("checked") || !unsold.prop("checked"))
							soldp = sold.prop("checked");
						
						var paidp;
						if (!paid.prop("checked") || !unpaid.prop("checked"))
							paidp = paid.prop("checked");
						
						cses.TBTBook.find({
							sold: soldp,
							paid: paidp,
						}).then(function(r){
							return Q.all(r.map(b => b.load()));
						}).then(function(r){
							return Q.all(r.map(b => b.seller.load())).thenResolve(r);
						}).done(function(books){
							console.log(books);
							var csv = Papa.unparse({
								fields: [
									"id",
									"title",
									"price",
									"paid",
									"seller id",
									"seller name",
									"seller email",
								],
								data: books.map(b => [
									b.id,
									b.title,
									b.price,
									b.paid,
									b.seller.id,
									b.seller.name,
									b.seller.emails[0]? b.seller.emails[0].email : "none",
								])
							});
							
							var url = "data:text/csv;charset=UTF-8,"
							          + encodeURIComponent(csv);
							document.location = url;
						}, function(e){
							console.error(e);
							error.text(e.toString());
						})
					}},
				}, function(su) {
					su("label", {text: "Sold "}, function(su){
						sold = su("input", {type: "checkbox", checked: true});
					}); su("br");
					su("label", {text: "Unsold "}, function(su){
						unsold = su("input", {type: "checkbox", checked: true});
					}); su("br");
					su("label", {text: "Paid "}, function(su){
						paid = su("input", {type: "checkbox", checked: true});
					}); su("br");
					su("label", {text: "Unpaid "}, function(su){
						unpaid = su("input", {type: "checkbox", checked: true});
					}); su("br");
					su("button", {type: "submit", text: "Submit"});
				});
				error = su("div");
			} else if (path[0] == "add") {
				su("h1", "Textbook Trade Add");
				var error;
				var title, edition, author, courses, price, seller, authorized;
				su("form", {
					on: {submit: function(e){
						e.preventDefault();
						
						var b = new cses.TBTBook();
						b.title = title.val() || undefined;
						b.edition = edition.val();
						b.author = author.val() || undefined;
						b.courses = courses.val()
						                   .replace(/[^0-9A-Za-z,]/g, '')
						                   .split(",")
						                   .filter(function(s){return s});
						b.price = price.val() || undefined;
						b.seller = seller.value;
						b.save(authorized.value).done(function(r){
							router.go("/textbooktrade/book/"+b.id);
						}, function(e){
							console.log(e, e.msg);
							error.text(e.msg);
						});
					}},
				}, function(su) {
					su("label", {text: "Title "}, function(su){
						title = su("input", {type: "text"});
						TitleComplete(title);
						
						function complete(e,book){
							if (!edition.val()) edition.val(book.edition);
							if (!author.val())  author.val(book.author);
							if (!courses.val()) courses.val(book.courses.join(","));
						}
						title.on("typeahead:selected", complete);
						title.on("typeahead:autocompleted", complete);
					}); su("br");
					su("label", {text: "Edition "}, function(su){
						edition = su("input", {type: "text"});
					}); su("br");
					su("label", {text: "Author "}, function(su){
						author = su("input", {type: "text"});
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
