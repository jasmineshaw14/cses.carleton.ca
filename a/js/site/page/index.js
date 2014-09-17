define([
	"jquery", "cses", "site/router", "site/PageGenerated", "site/templates",
	"scriptup", "site/ui/Banner", "jss", "site/ui/toolbelt", "site/ui/MyBanner",
	"moment"
], function(
	$, cses, router, mkgen, templates, scriptup, Banner, jss, toolbelt,
	MyBanner, moment
) {
	"use strict";
	
	function uiAdmin($cont, $post, post){
		var $t = toolbelt.tool("E", "Edit this page");
		$t.one("click", uiEdit.bind(undefined, $cont, $post, post));
		
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
	
	function renderpost($cont, p){
		var template = templates[p.type] || templates.page;
		
		var $post = $(template(p));
		$post.appendTo($cont)
		
		isAdmin().done(function(){
			uiAdmin($cont, $post, p);
		});
		
		return $post;
	}
	
	function uiHome(){
		return scriptup("div", function(su){
			var banner = new Banner();
			this.append(banner.$root);
			
			su("ul", {css:{float:"left"}}, function(su){
				[
					{href: "/hello-world", text: "A page"},
					{href: "/login",text: "Login"},
					{href: "/logout",text: "Logout"},
					{href: "/people", text: "People"},
					{href: "/no-page", text: "Dead link"},
					{href: "/textbooktrade", text: "Textbook Trade"}
				].forEach(function(i){
					su("li", function(su){ su("a", i) });
				});
			});
			
			this.append(uiUpcomming());
		});
	}
	
	var upcommingstyle = new jss.StyleSet(
		new jss.Style({
			fontSize: "0.8em",
			maxWidth: "100%",
			cssFloat: "right",
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
			su("h1", "Upcoming Events");
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
	
	function uiEdit($cont, $e, post){
		var deps = ["ckeditor4"]; // Lazy load.
		var editor;
		require(deps, function(CK){
			$e.attr("contenteditable", true);
			editor = CK.inline($e.get(0),{
				extraPlugins: [
					"sourcedialog",
					"showblocks",
					"colorbutton",
					"colordialog",
					"dialogadvtab",
					"table",
					"tabletools",
					"tab",
				].join(","),
			});
		});
		
		scriptup($cont, function(su){
			su("form", function(su){
				this.on("submit", function(e){
					e.preventDefault();
					// post.content = editor.getData();
					
					post.title   = title.val();
					post.content = $e.clone();
					
					post.save().done(function(r){
						router.load(post.id);
					})
				});
				window.p = post;
				var title = su("input", {
					type: "text",
					val: post.title,
				});
				post.titlechanged.add(function(t){
					title.val(t);
				});
				su("button", "Save");
			});
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
				$cont.append(renderpost($cont, p));
			}, function(){
				isAdmin().then(function(){
					scriptup($cont, function(su){
						su("h1", "There is nothing here.");
						su("button", "Create a Page")
							.on("click", function(e){
								e.preventDefault();
								
								$cont.empty();
								var p   = new cses.Post(location.pathname.slice(1));
								var $pe = renderpost($cont, p);
								$pe.html("<h1>A New Post</h1>");
								$cont.append($pe);
								
								uiEdit($cont, $pe, p);
							});
					});
				}, function(){
					router.load("404");
				});
			});
		}
	});
});
