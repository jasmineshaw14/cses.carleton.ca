define(["jquery", "url1"],
function($,        url)
{
	"use strict";
	
	var oururl = url.parse(document.location.href);
	
	/** A router for the application.
	 * 
	 * This handles changes in URLs and history.
	 * 
	 * Note: doesn't clean up after itself.  Don't keep creating or you will leak.
	 * 
	 * @param cont The container into which to load pages.  This will be passed
	 *             to jQuery to get an element.
	 */
	function Router(cont) {
		var self = this;
		
		this.$container = $(cont);
		this.curpage    = undefined;
		
		window.addEventListener("popstate", function(){
			self._onpopstate();
		});
		$(document).delegate("a", "click", function (e)
		{
			if ( e.which != 1 ) return; // Only left click.
			
			e.preventDefault();
			
			var rel = Router.relativeURL(this.href);
			console.log(rel);
			
			if (rel) // Is in our site.
			{
				e.preventDefault();
				self.go(rel);
			}
		});
		
		setTimeout(function(){ self.load(window.location.pathname.substr(1)) }, 0);
	}
	Object.defineProperties(Router, {
		/** Get relative portion of URL.
		 * 
		 * @param u The absolute URL.
		 * @return false if the URL doesn't point to the current site otherwise
		 *         a string containing the relative portion of the URL.
		 */
		relativeURL: {
			value: function Router_relativeURL ( u )
			{
				var p = url.parse(u);
				
				if ( p.host != oururl.host || p.scheme != oururl.scheme ) return false;
				return url.build({
					path: p.path,
					query: p.query,
					hash: p.hash,
				});
			}
		},
	});
	Object.preventExtensions(Router);
	Object.defineProperties(Router.prototype, {
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
				var self = this;
				
				// Get top-level path component.
				var comp = what.split("/")[0] || "index";
				
				// Load the page.
				require(["site/page/"+comp], function(Page) {
					if ( typeof Page != "function" ) // Probably can't reach server.
					{
						console.log("Error loading page!", "site/page/"+comp);
						self.load("404");
						return;
					}
					
					if (self.curpage) self.curpage.unload(); // Unload last page.
					
					self.curpage = new Page(self.$container);
					self.curpage.load();
					
					console.log("Displayed /"+what+".");
				}, function (e) {
					console.log("FAIL");
					console.log(e, e.requireModules, e.requireType);
					if ( e.requireType == "scripterror" ) {
						var pagepath = "site/page/";
						var pageload = e.requireModules.any(function(m){
							return m.startsWith(pagepath);
						});
						if (!pageload) return;
						
						console.log("Error loading page!", pageload);
						if (e.requireModules[0] != "site/page/404")
							self.load("404");
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
				window.history.pushState(null, "", where);
				
				// Make browser resolve relative urls for us.
				this.load(Router.relativeURL(window.location.href).substr(1));
			},
			enumerable: true,
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
				window.history.replaceState(null, "", where);
				
				// Make browser resolve relative urls for us.
				this.load(Router.relativeURL(window.location.href).substr(1));
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
				window.history.replaceState(null, "", where);
			},
			enumerable: true,
		},
		_onpopstate: {
			value: function Router__onpopstate(){
				this.load(window.location.pathname.substr(1));
			},
		},
	});
	
	return Router;
});
