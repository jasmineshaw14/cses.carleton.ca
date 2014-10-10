define([
	"jquery",
	"cses",
	"site/router",
	"site/PageGenerated",
	"site/templates",
	"scriptup",
	"site/ui/Banner",
	"jss",
	"site/ui/toolbelt",
	"site/ui/MyBanner",
	"moment",
	"site/ui/Post",
	"site/ui/News",
	"site/theme",
	"site/assets",
], function(
	$,
	cses,
	router,
	mkgen,
	templates,
	scriptup,
	Banner,
	jss,
	toolbelt,
	MyBanner,
	moment,
	PostView,
	News,
	theme,
	assets
) {
	"use strict";
	
	function uiAdmin(postview){
		var $t = toolbelt.tool("E", "Edit this page");
		$t.on("click", function(e){
			postview.edit();
		});
		
		router.navigation.addOnce(function(){
			$t.remove();
		});
	}
	
	function isAdmin(){
		return cses.authtoken.then(function(t){
			if (t && cses.authperms.indexOf("postw") >= 0) return true;
			else                                           throw false;
		});
	}
	
	function uiHome(){
		return scriptup("div", {
			css: {
				maxWidth: "50em",
				position: "relative",
			},
		}, function(su){
			su("div", {
				css:{
					float: "left",
					maxWidth: "calc(100% - 15em)",
				},
			}, function(su){
				su("ul", function(su){
					[
						{href: "/login",text: "Login"},
						{href: "/people", text: "People"},
						{href: "/textbooktrade", text: "Textbook Trade"}
					].forEach(function(i){
						su("li", function(su){ su("a", i) });
					});
				});
				
				this.append(new News().$root);
			});
			this.append(uiUpcomming());
		});
	}
	
	var upcommingstyle = new jss.StyleSet(
		new jss.Style({
			cssFloat: "right",
			fontSize: "0.8em",
			width: "15em",
			maxWidth: "100%",
			textAlign: "center",
		}),
		new jss.Style("& ul", {
			padding: "0",
			listStyle: "none",
		}),
		new jss.Style("& a", {
			display: "block",
			textDecoration: "none",
			color: "inherit",
		}),
		new jss.Style("& h2", {
			fontSize: "1em",
			margin: "1em 0 0 0",
			whiteSpace: "nowrap",
			overflow: "hidden",
			textOverflow: "ellipsis",
		}),
		new jss.Style("& p", {
			margin: "0.1em 0 0 0",
			color: "hsl(0,0%,40%)",
		})
	);
	function uiUpcomming(){
		return scriptup("aside", {class: upcommingstyle.classes}, function(su){
			su("h1", "Upcoming Events", function(su){
				this.prepend($("<img>", {
					src: assets.icons.calendar,
					css: {
						verticalAlign: "baseline",
						height: "1.6em",
						margin: "0 0.4em -0.4em 0",
					},
				}));
			});
			su("ul", function(su){
				cses.Event.fetch(8).done(function(events){
					events
						.filter(function(event){ return event.title.length < 40 })
						.slice(0, 8)
						.forEach(function(event){
							su("li").append(uiEvent(event));
						});
				});
			})
		});
	}
	function uiEvent(e){
		return scriptup("a", {
			href: e.href,
		}, function(su){
			su("h2", e.title);
			
			var ds;
			var start = moment(e.start).startOf("day");
			var end   = e.end && moment(e.end).startOf("day");
			
			var ys = end.year() == moment().year()? "" : " YYYY";
			
			if (start.year() == end.year()) {
				if (start.month() == end.month()) {
					if (start.day() == end.day()){
						ds = start.format("MMMM Do"+ys);
					} else {
						ds  = start.format("MMMM Do");
						ds += " - ";
						ds += end.format("Do"+ys);
					}
				} else {
					ds  = start.format("MMMM Do");
					ds += " - ";
					ds += end.format("MMMM Do"+ys)
				}
			} else {
				ds  = start.format("MMMM Do YYYY");
				ds += " - ";
				ds += end.format("MMMM Do YYYY");
			}
			su("p", ds);
		});
	}
	
	return mkgen(function($cont){
		var s = location.pathname.substr(1);
		if (!s) { // Index page.
			document.title = "CSES";
			$cont.append(uiHome());
		} else { // Fetch from database.
			
			// Remove trailing slash.
			if (s.slice(-1) == "/") {
				s = s.replace(/\/+$/, "");
				router.updateURL("/"+s);
			}
			
			var p = new cses.Post(s);
			p.load().done(function(){
				var pv = new PostView(p);
				isAdmin().done(function(){
					pv.renderAdmin();
					uiAdmin(pv);
				});
				
				$cont.css("maxWidth", "auto");
				$cont.append(pv.$root);
			}, function(){
				isAdmin().then(function(){
					scriptup($cont, function(su){
						su("h1", "There is nothing here.");
						su("button", "Create a Page")
							.on("click", function(e){
								e.preventDefault();
								
								var p = new cses.Post(location.pathname.slice(1));
								p.content = "<h1>A New Post</h1>";
								var pv = new PostView(p);
								pv.edit();
								
								$cont.empty().append(pv.$root)
							});
					});
				}, function(){
					router.load("404");
				});
			});
		}
	});
});
