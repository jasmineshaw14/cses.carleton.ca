define(["jquery", "scriptup", "site/assets"],
function($, scriptup, assets)
{
	"use strict";
	
	var container = $("#header");
	
	var links = [
		{text: "Services", href: "/services"},
		{text: "Publications", href: "/publications"},
		{text: "Get Involved", href: "/getinvolved"},
		{text: "About Us", href: "/about"},
		{text: "Governance", href: "/governance"},
		{text: "Contact", href: "/contact"},
	];
	
	function drawHeader480(){
		return scriptup("h1", "No small header");
	}
	function drawHeader850(){
		return scriptup("div", {
			css: {
				textAlign: "center",
				fontSize: "1.3rem",
			},
		}, function(su){
				var img = su("a", {
					href: "/",
				}, function(su){
					su("img", {
						src: assets.logo,
						alt: "CSES Logo",
						css: {
							display: "inline-block",
							maxWidth: "8em",
							marginBottom: "-1.4em", // For when the links wrap.
						}
					});
				});
				su("ul", {
					css: {
						display: "inline-block",
						padding: 0,
						margin: "1.4em 0 0",
						listStyle: "none",
						textAlign: "left",
						verticalAlign: "top",
					},
				}, function(su){
					for (var i = 0; i < links.length; i++) {
						su("li", function(su) {
							su("a", {
								href: links[i].href,
								text: links[i].text,
								"class": "navlink",
							});
						});
					}
			});
		});
	}
	function drawHeaderBig(){
		function navlinkcont(su,  c) {
			su("div", {
				css: {
					display: "inline-block",
				},
			}, c);
		}
		function navlink(su, l) {
			su("a", {
				text: l.text,
				href: l.href,
				"class": "navlink",
				css: {
					display: "inline-block",
					padding: "0 0.4em",
				},
			});
		}
		return scriptup("div", {
			css: {
				textAlign: "center",
				fontSize: "1.3rem",
				marginBottom: "5em",
				
				background: "linear-gradient(to bottom, hsl(0,0%,100%), hsl(0,0%,97%))",
				borderBottom: "0.1em solid hsl(0, 0%, 83%)",
				// boxShadow: "hsl(0, 0%, 60%) 0 0 3em -0.5em",
			},
		}, function(su){
			su("div", {
				css: {
					display: "inline-block",
				},
			}, function(su){
				navlinkcont(su, function(su){
					for (var i = 0; i < links.length/2; i++) {
						navlink(su, links[i]);
					}
				});
				su("a", {
					href: "/",
					css: {
						position: "relative",
						display: "inline-block",
						width: "8em",
						height: "7.5em",
						margin: "0",
						padding: "0",
						verticalAlign: "bottom",
					},
				}, function(su){
					su("img", {
						src: assets.headerBasket,
						css: {
							position: "absolute",
							width: "15.92em",
							left: "-3.96em",
							bottom: "-4.61em"
						},
					});
					su("img", {
						src: assets.logo,
						alt: "CSES Logo",
						css: {
							position: "absolute",
							width: "8em",
							left: "0",
							bottom: "-3.8em"
						},
					});
				});
				navlinkcont(su, function(su){
					for (var i = links.length/2; i < links.length; i++) {
						navlink(su, links[i]);
					}
				});
			});
		});
	}
	
	var lastsize;
	var sizes = [
		// {w: 480, f: drawHeader480},
		{w: 850, f: drawHeader850},
		{w: Infinity, f: drawHeaderBig},
	];
	function drawHeader(){
		var wsize = window.innerWidth;
		var i;
		for (i = 0; sizes[i].w < wsize; i++)
			;
		
		if (i === lastsize) return; // Save work.
		lastsize = i;
		
		var si = sizes[i];
		// console.log("Changing Header to", i, si);
		
		container.empty().append(si.f());
	}
	
	$(window).on("resize", drawHeader);
	drawHeader();
});
