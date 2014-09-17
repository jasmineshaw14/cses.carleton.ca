define(["exports", "jquery", "url1", "jssignals1"],
function(self,      $,        url, signals)
{
	"use strict";
	
	var oururl = url.parse(location.href);
	var loadid = 0; // The "id" of the last load.
	
	/** A router for the application.
	 * 
	 * This handles changes in URLs and history.
	 * 
	 * Note: doesn't clean up after itself.  Don't keep creating or you will leak.
	 * 
	 * @param cont The container into which to load pages.  This will be passed
	 *             to jQuery to get an element.
	 */
	
	addEventListener("popstate", function(){
		self._onpopstate();
	});
	$(document).delegate("a", "click", function (e) {
		if ( e.which != 1 ) return; // Only left click.
		
		var rel = self.relativeURL(this.href);
		
		if (rel) // Is in our site.
		{
			self.go(rel);
			e.preventDefault();
		}
	});
	
	Object.defineProperties(self, {
		$container: {value: $("#content")},
		curpage:  {value: undefined, writable: true},
		
		/** Get relative portion of URL.
		 * 
		 * @param u The absolute URL.
		 * @return false if the URL doesn't point to the current site otherwise
		 *         a string containing the relative portion of the URL.
		 */
		relativeURL: {
			value: function router_relativeURL ( u )
			{
				var p = url.parse(u);
				
				if (p.host   != oururl.host
				 || p.scheme != oururl.scheme
				 || p.port   != oururl.port  ) return false;
				return url.build({
					path: p.path,
					query: p.query,
					hash: p.hash,
				});
			}
		},
		
		/** Load a page.
		 * 
		 * Loads the page into the container.  This is a low level method that
		 * does not deal with history and URL.
		 * 
		 * @param what The relative URL of the page to load.
		 */
		load: {
			value: function router_load(what) {
				console.log("Loading /"+what);
				
				var u = url.parse("/"+what);
				
				self.navigation.dispatch();
				
				// Get top-level path component.
				var comp = what.split("/")[0] || "index";
				
				// Short circuit if we know the file doesn't exist.
				if (!comp.match(new RegExp("^"+[
					"404",
					"500",
					"admin(|/.*)",
					"credits",
					"edit",
					"index",
					"login",
					"logout",
					"people",
					"textbooktrade",
				].join("|")+"$")))
					return self.load("index");
				
				var ourloadid = ++loadid;
				
				// Load the page.
				require(["site/page/"+comp], function(resolver) {
					if (loadid != ourloadid) return; // Another load has started.
					
					if ( typeof resolver != "function" ) // Probably can't reach server.
					{
						console.log("Error loading page!", "site/page/"+comp);
						self.load("404");
						return;
					}
					
					resolver(u).then(function(Page){
						self.$container.children().detach();
						if (self.curpage) self.curpage.unload(); // Unload last page.
						
						self.curpage = new Page(u);
						self.$container.append(self.curpage.$root);
						self.curpage.load();
						
						console.log("Displayed /"+what+".");
					}).catch(function(e){
						console.log("Error", e, arguments);
						self.load("500");
					}).done();
				}, function (e) {
					console.log("FAIL");
					console.log(e, e.requireModules, e.requireType);
					if ( e.requireType == "scripterror" ) {
						var pagepath = "site/page/";
						var pageload = e.requireModules.some(function(m){
							return m.substr(0, pagepath.length) == pagepath;
						});
						if (!pageload) return;
						
						console.log("Error loading page!", pageload);
						if (e.requireModules[0] != "site/page/index")
							self.load("index");
					}
					else throw e;
				});
			},
			enumerable: true,
		},
		/** Navigate to the page.
		 * 
		 * This function deals with adding a history entry and loading the new
		 * page.
		 * 
		 * @param where The relative url to go to.
		 */
		go: {
			value: function router_go(where) {
				console.log("Going", where);
				this.pushURL(where);
				
				// Make browser resolve relative urls for us.
				this.load(this.relativeURL(location.href).substr(1));
			},
			enumerable: true,
		},
		
		/** Change the URL and create history.
		 * 
		 * This creates a history element for the old page and changes to the
		 * new URL without actually loading anything.
		 */
		pushURL: {
			value: function router_pushURL(where){
				history.pushState(null, "", where);
			},
		},
		
		/** Replace the current page.
		 * 
		 * Loads a new page over the same history slot as the old page.  The url
		 * is updated.
		 * 
		 * @param where The relative URL of the new page.
		 */
		replace: {
			value: function router_replace(where) {
				console.log("Replacing", where);
				history.replaceState(null, "", where);
				
				// Make browser resolve relative urls for us.
				self.load(self.relativeURL(location.href).substr(1));
			},
			enumerable: true,
		},
		/** Change the current URL.
		 * 
		 * This does not load the new page and replaces the current history slot.
		 * 
		 * @param where The new URL.
		 */
		updateURL: {
			value: function router_updateURL(where) {
				console.log("Changing URL to", where);
				history.replaceState(null, "", where);
			},
			enumerable: true,
		},
		_onpopstate: {
			value: function router__onpopstate(){
				self.load(location.pathname.substr(1));
			},
		},
		
		/** Drop a trailing slash from the path.
		 * 
		 * This doesn't load any pages merely overwrites the current history
		 * slot.
		 */
		dropSlash: {
			value: function router_dropSlash(){
				this.updateURL(location.pathname.slice(0, -1));
			},
		},
		
		navigation: {value: new signals.Signal()}
	});
	Object.preventExtensions(self);
	
	return self;
});
