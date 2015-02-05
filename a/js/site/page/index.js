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
	"site/ui/Bars",
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
	assets,
	Bars
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
				position: "relative",
				overflow: "auto",
			},
		}, function(su){
			su("div", {
				css:{
					float: "left",
					maxWidth: "calc(100% - 1em - 16rem)",
				},
			}, function(su){
				this.append(new News().$root);
			});
			this.append(uiUpcomming().css({
				marginTop: "0.6em",
			}));
		});
	}
	
	function uiBars(){
		var bars = new Bars();
		
		var bar  = bars.createBar();
		bar.background = "#553E79";
		bar.add("/getinvolved", "Get Involved",
			"Voluntering with Carleton Engineering – whether you're an " +
			"engineering student or not – is unimaginably fun. The ability " +
			"to balence time commitements, network with new people and work " +
			"effectivally in a team will make you an asset for any company. " +
			"Check out the oppertunities we have to offer."
		);
		bar.add("/getinvolved/findclub", "Clubs",
			"Looking for a club that tailors to your interests? Or looking " +
			"for something completely new? Look no further!"
		);
		bar.add("/getinvolved/findanevent", "Events",
			"Looking for various events to take part in? Here you can find a " +
			"multitude of Club and Societal events!"
		);
		
		bar  = bars.createBar();
		bar.background = "#AF1F24";
		bar.add("/services/swag", "EngWear",
			"EngWear is a service provided by CSES.  Every year, we order " +
			"sweet swag that is emblazoned with the Carleton Engineering " +
			"logo, so you can wear it proudly wherever you are."
		);
		bar.add("/services/swag", "What We Have",
			"We sell clothing such as hoodies, sweatpants, FIT shirts, and " +
			"items such flasks, shot glasses and patches. Check out our " +
			"inventory."
		);
		bar.add("/services/swag", "Create Your Own",
			"Have a design that could make some super cool swag‽ We want to " +
			"see it! Send us your designs to be featured as official CSES " +
			"swag."
		);
		
		// bar  = bars.createBar();
		// bar.background = "#272826";
		
		return bars.$root;
	}
	
	var upcommingstyle = new jss.StyleSet(
		new jss.Style({
			cssFloat: "right",
			fontSize: "0.8em",
			width: "16rem",
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
			});
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
			$cont.css("maxWidth", "50rem");
			$cont.append(uiHome());
			this.$after.append(uiBars());
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
