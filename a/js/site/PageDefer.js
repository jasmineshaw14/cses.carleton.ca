define(["site/Page", "q1", "site/router"],
function(Page,        Q,    router)
{
	"use strict";
	
	console.log("Called", Page, Q, router);
	/** A factory for generating deferred pages.
	 * 
	 * @param module The module that will provide the page.
	 * @return a subclass of Page.
	 */
	return function makedefer(func) {
		function PageDefered() {
			var self = this;
			var arg = arguments;
			this._paged = Q.defer();
			this._page = this._paged.promise;
			require([func()], function(Page){
				// Manual new.
				var p = Object.create(Page.prototype);
				p = Page.apply(p, arg) || p;
				
				self._paged.resolve(p);
			}, function (e) {
				console.log("DEFERED-FAIL");
				console.log(e, e.requireModules, e.requireType);
				if ( e.requireType == "scripterror" ) {
					var pagepath = "site/page/";
					var pageload = e.requireModules.some(function(m){
						return m.substr(0, pagepath.length) == pagepath;
					});
					if (!pageload) return;
					
					console.log("Error loading page!", pageload);
					if (e.requireModules[0] != "site/page/index")
						router.load("index");
				}
				else throw e;
			});
		}
		Object.preventExtensions(PageDefered);
		PageDefered.prototype = Object.create(Page.prototype, {
			constructor: {value: Page},
			
			load: {
				value: function PageStatic_load(){
					return this._page.done(function(p){
						console.log("aionrvr", p);
						return p.load.apply(p, arguments);
					});
				},
			},
			unload: {
				value: function PageStatic_unload(){
					return this._page.done(function(p){
						return p.unload.apply(p, arguments);
					});
				},
			},
		});
		Object.preventExtensions(PageDefered.prototype);
		
		return PageDefered;
	};
});
