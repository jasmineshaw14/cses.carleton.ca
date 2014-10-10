define(["jquery", "scriptup", "site/assets", "site/theme", "jss"],
function($, scriptup, assets, theme, jss)
{
	"use strict";
	
	var container = $("#footer");
	var icons = assets.icons;
	
	var iconliststyle = new jss.StyleSet(
		theme.chrome.linkFont,
		new jss.Style("& li", {
			textAlign: "left",
		}),
		new jss.Style("& li>a", {
			display: "block",
			padding: "0.4em",
			transition: "background 0.3s",
		}),
		theme.hoverMixin("& li>a:hover"),
		new jss.Style("& li>a>*", {
			display: "inline-block",
			verticalAlign: "middle",
			whiteSpace: "pre",
		}),
		new jss.Style("& li>a>img", {
			width: "2em",
		}),
		new jss.Style("& li>a>span, & li>a>address", {
			margin: "0 1em",
		})
	);
	
	var navlinkcont = new jss.StyleSet(
		new jss.Style({
			textAlign: "center",
			background: theme.chrome.bg,
			margin: "1em 0 0",
		}),
		new jss.Style("&>*", {
			display: "inline-block",
			verticalAlign: "middle",
			margin: "1em 2em",
		})
	);
	
	function drawFooterBig(){
		return scriptup("div", {
			class: navlinkcont.classes,
		}, function(su){
			su("div", function(su){
				su("a", {
					href: "/",
					class: theme.chrome.headerFont.classes,
					css: {
						fontSize: "1.4em",
						textAlign: "left",
					},
				}, function(su){
					su("img", {
						src: assets.logo,
						alt: "CSES Logo",
						css: {
							width: "4.5em",
							verticalAlign: "middle",
						}
					});
					su("div", {
						css: {
							display: "inline-block",
							marginLeft: "1.5em",
							whiteSpace: "pre",
							verticalAlign: "middle",
						},
						text: "Carleton\nStudent\nEngineering\nSociety",
					});
				});
			});
			su("ul", {
				class: iconliststyle.classes,
			}, function(su){
				[
					{
						href: "tel:+16135203616", text: "613-520-3616",
						img: icons.phone, alt: "Phone",
					}, {
						href: "mailto:questions@cses.carleton.ca", text: "questions@cses.carleton.ca",
						img: icons.email, alt: "Facebook",
					}, {
						href: "https://facebook.com/MyCSES", text: "/MyCSES",
						img: icons.facebook, alt: "Facebook",
					}, {
						href: "https://twitter.com/MyCSES", text: "@MyCSES",
						img: icons.twitter, alt: "Twitter",
					},
				].forEach(function(e){
					su("li", function(su){
						su("a", {
							href: e.href,
						}, function(su){
							su("img", {src: e.img, alt: e.alt});
							su("span", e.text);
						});
					});
				});
			});
			su("ul", {
				class: iconliststyle.classes,
			}, function(su){
				[
					{
						text: "2090 Minto CASE\n1125 Colonel By Drive\nOttawa, ON\nK1S 5B6",
						img: icons.addr, alt: "Address",
						href: "https://www.google.ca/maps/place/"+
							"1125+Colonel+By+Dr,+Carleton+University,+Ottawa,+ON+K1S+5B6",
					},
				].forEach(function(e){
					su("li", function(su){
						su("a", {
							href: e.href,
						}, function(su){
							su("img", {src: e.img, alt: e.alt});
							su("address", e.text).css("fontWeight", 300);
						});
					});
				});
			});
		});
	}
	
	var lastsize;
	var sizes = [
		// {w: 480, f: drawFooter480},
		{w: Infinity, f: drawFooterBig},
	];
	function drawFooter(){
		var wsize = window.innerWidth;
		var i;
		for (i = 0; sizes[i].w < wsize; i++)
			;
		
		if (i === lastsize) return; // Save work.
		lastsize = i;
		
		var si = sizes[i];
		// console.log("Changing Footer to", i, si);
		
		container.empty().append(si.f());
	}
	
	$(window).on("resize", drawFooter);
	drawFooter();
});
