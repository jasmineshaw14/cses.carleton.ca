define(["jquery", "scriptup", "cses"],
function($, scriptup, cses)
{
	"use strict";
	
	var container = $("#footer");
	
	function drawFooterBig(){
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
				paddingTop: "1em",
			},
		}, function(su){
			su("div", {
				css: {
					display: "inline-block",
					marginBottom: "3em",
				},
			}, function(su){
				su("a", {
					href: "/",
					css: {
						display: "inline-block",
						textAlign: "left",
						textTransform: "uppercase",
						fontWeight: "bold",
						whiteSpace: "pre",
					},
				}, function(su){
					su("img", {
						src: cses.blobprefix+"74942A93AF264C186677F5FAC01C80B672705948",
						alt: "CSES Logo",
						css: {
							width: "5em",
							verticalAlign: "middle",
						}
					});
					su("div", {
						css: {
							display: "inline-block",
							whiteSpace: "pre",
							verticalAlign: "middle",
						},
						text: "Carleton\nStudent\nEngineering\nSociety",
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
