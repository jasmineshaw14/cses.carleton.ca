define(["jquery", "scriptup", "site/assets", "site/theme", "jss"],
function($, scriptup, assets, theme, jss)
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
	
	var linkstyle = new jss.StyleSet(
		theme.chrome.headerLinkFont,
		new jss.Style({
			textTransform: "lowercase",
			fontSize: "1.3em",
		}),
		new jss.Style("&:hover", {
			visibility: "hidden",
		}),
		new jss.Style("&:hover::before", {
			visibility: "visible",
			content: 'attr(data-text)',
			fontWeight: "bolder",
			// textDecoration: "underline",
			position: "absolute",
		})
	);
	var titlestyle = new jss.StyleSet(
		theme.chrome.headerFont,
		new jss.Style({
			fontSize: "2em",
		})
	);
	
	function drawHeader480(){
		return scriptup("h1", "No small header");
	}
	
	var header1000_container = new jss.Style("&>*", {
		display: "inline-block",
		margin: "1.3em 1.3em 0 0",
		verticalAlign: "middle",
	});
	function drawHeader1000(){
		return scriptup("div", {
			class: header1000_container.classes,
			css: {
				textAlign: "center",
				fontSize: "1.3em",
			},
		}, function(su){
				var img = su("a", {
					href: "/",
				}, function(su){
					su("img", {
						src: assets.logo,
						alt: "CSES Logo",
						css: {
							maxWidth: "8em",
						}
					});
				});
				su("ul", {
					css: {
						textAlign: "left",
					},
				}, function(su){
					for (var i = 0; i < links.length; i++) {
						su("li", function(su) {
							su("a", {
								href: links[i].href,
								text: links[i].text,
								"data-text": links[i].text,
								"class": linkstyle.classes,
							});
						});
					}
			});
		});
	}
	var headerBig_continer = new jss.StyleSet(
		new jss.Style("&>*", {
			display: "inline-block",
			verticalAlign: "bottom",
		}),
		new jss.Style("&>*:first-child", {textAlign: "right"}),
		new jss.Style("&>*:last-child", {textAlign: "left"})
	);
	function drawHeaderBig(){
		function navlink(su, l) {
			return su("a", {
				text: l.text,
				href: l.href,
				"data-text": l.text,
				"class": linkstyle.classes,
				css: {
					display: "inline-block",
					margin: "1em 0.7em",
				},
			});
		}
		return scriptup("div", {
			css: {
				textAlign: "center",
				marginBottom: "2em",
				
				background: "linear-gradient(to bottom, hsl(0,0%,100%),"+theme.chrome.bg+")",
				borderBottom: "0.1em solid hsl(0, 0%, 83%)",
				// boxShadow: "hsl(0, 0%, 60%) 0 0 3em -0.5em",
			},
		}, function(su){
			su("div", {
				class: headerBig_continer.classes,
				css: {
					display: "inline-block",
				},
			}, function(su){
				su("div", function(su){
					su("h1", {
						text: "Carleton Student",
						class: titlestyle.classes,
					});
					for (var i = 0; i < links.length/2; i++) {
						navlink(su, links[i]);
					}
				});
				su("a", {
					href: "/",
					css: {
						position: "relative",
						width: "8em",
						height: "7.5em",
						margin: "0 2em",
						padding: "0",
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
				su("div", function(su){
					su("h1", {
						text: "Engineering Society",
						class: titlestyle.classes,
					});
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
		{w: 1000, f: drawHeader1000},
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
