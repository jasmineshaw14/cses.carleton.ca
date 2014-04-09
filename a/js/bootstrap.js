define(function(){
	"use strict";
	
	var paths = {
		//requirejs: "require",
		site: "/a/js",
		cses0: "/a/js/cses",
		
		backbone1: [
			"https://cdn.jsdelivr.net/backbonejs/1.1.2/backbone-min",
			"https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
		],
		jquery: [ // jQuery won't let us name it.
			"https://cdn.jsdelivr.net/jquery/2.1.0/jquery.min",
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min",
		],
		jssignals1: [
			"https://cdn.jsdelivr.net/js-signals/1.0.0/signals.min",
			"https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals.min",
		],
		q1: [
			"https://cdnjs.cloudflare.com/ajax/libs/q.js/1.0.0/q.min",
		],
		store2: [
			//"https://cdn.jsdelivr.net/store/2.1.2/store2.min", Too old, doesn't define itself.
			"https://cdnjs.cloudflare.com/ajax/libs/store.js/1.3.14/store.min",
		],
		sugar1: [
			"https://cdn.jsdelivr.net/sugar/1.3.9/sugar.min",
			"https://cdnjs.cloudflare.com/ajax/libs/sugar/1.4.1/sugar.min",
		],
		"sugar-unix1": [
			"/a/js/sugar-unix1",
		],
		underscore: [ // Underscore won't let us name it.
			"https://cdn.jsdelivr.net/underscorejs/1.6.0/underscore-min",
			"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min",
		],
		url1: "/a/js/url",
	};
	
	if (window.location.hostname == "localhost") {
		///// Source versions for easy debugging.
		// backbone has source map.
		paths.jquery.unshift(
			"https://cdn.jsdelivr.net/jquery/2.1.0/jquery",
			"https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery");
		paths.jssignals1.unshift(
			"https://cdn.jsdelivr.net/js-signals/1.0.0/signals",
			"https://cdnjs.cloudflare.com/ajax/libs/js-signals/1.0.0/js-signals");
		paths.q1.unshift(
			"https://cdnjs.cloudflare.com/ajax/libs/q.js/1.0.0/q");
		//paths.store2.unshift( Doesn't define itself.
		//	"https://cdn.jsdelivr.net/store/2.1.2/store2");
		paths.sugar1.unshift(
			"https://cdnjs.cloudflare.com/ajax/libs/sugar/1.4.1/sugar-full.development");
		// Sugar unix is source.
		// underscore has source map.
	}
	
	require.config({
		baseUrl: "/dev/null",
		paths: paths,
		waitSeconds: 15,
		//enforceDefine: true,
		
		deps: [ // Preload modules we know we will need.
			"cses0",
			
			"backbone1",
			"jquery",
			"jssignals1",
			"q1",
			"store2",
			"underscore",
			"url1",
		],
	});
	
	// Turn on for better error messages.
	require(["q1"],function(Q){Q.longStackSupport = true});
	
	// Start.
	require(["sugar1"], function() {
		require(["sugar-unix1"], function() {
			require(["site/main"], function(main){
				//stuff
			});
		});
	});
});
