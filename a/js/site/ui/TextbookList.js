define(["jquery", "cses", "scriptup", "jss", "site/theme"],
function($, cses, scriptup, jss, theme)
{
	"use strict";
	
	function isadmin(){ return cses.authperms.indexOf("tbt") >= 0 }
	
	var style = new jss.StyleSet(
		new jss.Style({
			display: "table",
			width: "100%",
		}),
		new jss.Style("& > a", {
			display: "table-row-group",
			fontSize: "0.8em",
			transition: "background 0.2s",
		}),
		new jss.Style("& > a:hover", {
			background: theme.sepColor,
		}),
		new jss.Style("& > a > div", {
			display: "table-row",
		}),
		new jss.Style("& > a > div > div", {
			display: "table-cell",
			padding: " 0 1em 0.7em 1em",
		}),
		new jss.Style("& > a > div:first-child > div", {
			borderTop: theme.sepBorder,
			paddingTop: "0.7em",
		}),
		new jss.Style("& dt", {
			display: "inline",
			fontWeight: "bolder",
		}),
		new jss.Style("& dd", {
			display: "inline",
		}),
		new jss.Style("& dt::after", {
			content: "': '",
		})
	);
	function booktile(b){
		b.load();
		return scriptup("a", {
			href: "/textbooktrade/book/"+b.id,
		}, function(su){
			if (isadmin()) {
				su("div", function(su){
					su("div", function(su){
						su("dt", "ID");
						var e = su("dd", b.id);
					});
					su("div", function(su){
						su("dt", "Seller");
						var e = su("dd", "");
						b.sellerchanged.add(function(t){
							t.namefullchanged.add(function(n){
								e.text(n);
							});
							t.load();
						});
					});
					su("div", function(su){
						su("dt", "Buyer");
						var e = su("dd", "");
						b.buyerchanged.add(function(t){
							if (t) {
								t.namefullchanged.add(function(n){
									e.text(n);
									e.css("opacity", 1);
								});
								t.load();
							} else {
								e.text("None");
								e.css("opacity", 0.5);
							}
						});
					});
				});
			}
			su("div", function(su){
				su("div", function(su){
					su("dt", "Title");
					var e = su("dd", "");
					b.titlechanged.add(function(t){ e.text(t) })
				});
				su("div", function(su){
					su("dt", "Author");
					var e = su("dd", "");
					b.authorchanged.add(function(t){ e.text(t) })
				});
				su("div", function(su){
					su("dt", "Price");
					var e = su("dd", "");
					b.pricechanged.add(function(t){ e.text("$"+t) })
				});
			});
			su("div", function(su){
				su("div", {css:{columnSpan: "all"}}, function(su){
					su("dt", "Edition");
					var e = su("dd", "");
					b.editionchanged.add(function(t){ e.text(t) })
				});
				su("div"); // No colspan so put nothing in the column.
				su("div", function(su){
					su("dt", "Availability");
					var e = su("dd", "");
					b.buyerchanged.add(function(s){
						e.text(s? "Not Available" : "Available");
						e.css("color", s? theme.textBadColor : theme.textGoodColor);
					});
				});
			});
		});
	}
	
	function TextbookList(books){
		if (!books.length) {
			return scriptup("div", {
				text: "No books match your search.",
				css: {
					textAlign: "center",
					margin: "3em",
					color: theme.textDeemphColor,
				},
			});
		}
		
		return scriptup("div", {
			class: "chrome "+style.classes,
		}, function(su){
			var self = this;
			
			books.forEach(function(b) {
				self.append(booktile(b));
			});
		});
	}
	
	return TextbookList;
});
