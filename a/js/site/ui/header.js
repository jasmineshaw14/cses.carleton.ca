define(["jquery", "scriptup", "site/assets", "site/theme", "jss"],
function($, scriptup, assets, theme, jss)
{
	"use strict";
	
	var container = $("#header");
	
	var links = [
		{text: "Services", href: "/services", sub: [
			{text: "Alexander's Office",     href: "/services/office"},
			{text: "EngSwag",                href: "/services/swag"},
			{text: "Equipment Loan Program", href: "/services/equipmentloans"},
			{text: "Leo's",                  href: "/services/leos"},
			{text: "McCoy's",                href: "/services/mccoys"},
			{text: "SGRC",                   href: "/services/sgrc"},
			{text: "SGF",                    href: "/services/sgf"},
			{text: "Exam Library",           href: "/services/Exam Library"},
			{text: "Trade/Library",          href: "/services/library"},
		]},
		{text: "Publications", href: "/publications", sub: [
			{text: "Handbook",   href: "/publications/handbook"},
			{text: "Iron Times", href: "/publications/irontimes"},
			{text: "Passport",   href: "/publications/passport"},
		]},
		{text: "Get Involved", href: "/getinvolved", sub: [
			{text: "Find a Club",   href: "/getinvolved/clubs"},
			{text: "Make a Club",   href: "/getinvolved/clubs/new"},
			{text: "Events",        href: "/getinvolved/events"},
			{text: "Directorships", href: "/getinvolved/directorships"},
			{text: "Conferences",   href: "/getinvolved/conferences"},
			{text: "Join Council!", href: "/getinvolved/council/join"},
		]},
		{text: "About Us", href: "/about", sub: [
			{text: "Our People",        href: "/about/people"},
			{text: "Affiliated Groups", href: "/about/groups"},
		]},
		{text: "Governance", href: "/governance", sub: [
			{text: "Accountability",       href: "/governance/accountability"},
			{text: "Documents and Forms",  href: "/governance/docs"},
			{text: "Elections",            href: "/governance/elections"},
			{text: "Meetings and Minutes", href: "/governance/meetings"},
		]},
		{text: "Contact", href: "/contact"},
	];
	
	var dropdownstyle = new jss.StyleSet(
		new jss.Style({
			position: "absolute",
			left: "0",
			top: "100%",
			visibility: "visible",
			background: theme.chrome.bg,
			textAlign: "left",
			textTransform: "none",
			width: "12em",
			fontWeight: "normal",
		}),
		new jss.Style("&::before", {
			content: "''",
			display: "block",
			width: "1ch",
			height: "1ch",
			margin: "0.2em 0 -0.5ch 0.6em",
			transform: "rotateZ(45deg)",
			
			background: theme.chrome.bg,
			border: "1px solid hsl(0, 0%, 78%)",
			borderRight: "none",
			borderBottom: "none",
		}),
		new jss.Style("&>li", {
			border: "1px solid hsl(0, 0%, 78%)",
		}),
		new jss.Style("&>li:not(:first-child)", {
			borderTop: "none",
		}),
		new jss.Style("&>li>a", {
			position: "relative",
			display: "block",
			padding: "0.4em",
		}),
		new jss.Style("&>li>a:hover", {
			background: "hsl(0,0%,78%)",
			border: "1px solid hsl(0, 0%, 78%)",
			margin: "-1px",
		})
	);
	
	function uiDropdown(spec){
		return scriptup("ul", {
			class: dropdownstyle.classes,
		}, function(su){
			spec.forEach(function(item){
				su("li", function(su){
					su("a", {
						text: item.text,
						href: item.href,
					});
				});
			});
		});
	}
	
	var linkstyle = new jss.StyleSet(
		theme.chrome.headerLinkFont,
		new jss.Style({
			position: "relative",
			textTransform: "lowercase",
			fontSize: "1.3em",
		}),
		new jss.Style("&:hover", {
			visibility: "hidden",
		}),
		new jss.Style("&:not(:hover) ul", {
			display: "none",
		}),
		new jss.Style("&:hover::before", {
			display: "block",
			visibility: "visible",
			content: 'attr(data-text)',
			fontWeight: "bolder",
			// textDecoration: "underline",
			position: "absolute",
			whiteSpace: "pre",
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
		function navlink(l) {
			return scriptup("a", {
				text: l.text,
				href: l.href,
				"data-text": l.text,
				"class": linkstyle.classes,
				css: {
					display: "inline-block",
					margin: "1em 0.7em",
				},
			}, function(su){
				if (l.sub)
					this.append(uiDropdown(l.sub));
			});
		}
		return scriptup("div", {
			css: {
				textAlign: "center",
				marginBottom: "4em",
				
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
						this.append(navlink(links[i]));
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
							bottom: "-4.6em"
						},
					});
					su("img", {
						src: assets.logo,
						alt: "CSES Logo",
						css: {
							position: "absolute",
							width: "8em",
							left: "0",
							bottom: "-4em"
						},
					});
				});
				su("div", function(su){
					su("h1", {
						text: "Engineering Society",
						class: titlestyle.classes,
					});
					for (var i = links.length/2; i < links.length; i++) {
						this.append(navlink(links[i]));
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
